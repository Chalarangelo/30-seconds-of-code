// Copyright 2013, 2014, 2015, 2016, 2017, 2018, 2019 Lovell Fuller and contributors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <algorithm>
#include <cmath>
#include <map>
#include <memory>
#include <numeric>
#include <string>
#include <tuple>
#include <utility>
#include <vector>

#include <vips/vips8>
#include <node.h>
#include <nan.h>

#include "common.h"
#include "operations.h"
#include "pipeline.h"

class PipelineWorker : public Nan::AsyncWorker {
 public:
  PipelineWorker(
    Nan::Callback *callback, PipelineBaton *baton, Nan::Callback *debuglog, Nan::Callback *queueListener,
    std::vector<v8::Local<v8::Object>> const buffersToPersist) :
    Nan::AsyncWorker(callback, "sharp:PipelineWorker"),
    baton(baton), debuglog(debuglog), queueListener(queueListener),
    buffersToPersist(buffersToPersist) {
    // Protect Buffer objects from GC, keyed on index
    std::accumulate(buffersToPersist.begin(), buffersToPersist.end(), 0,
      [this](uint32_t index, v8::Local<v8::Object> const buffer) -> uint32_t {
        SaveToPersistent(index, buffer);
        return index + 1;
      });
  }
  ~PipelineWorker() {}

  // libuv worker
  void Execute() {
    using sharp::HasAlpha;
    using sharp::ImageType;

    // Decrement queued task counter
    g_atomic_int_dec_and_test(&sharp::counterQueue);
    // Increment processing task counter
    g_atomic_int_inc(&sharp::counterProcess);

    std::map<VipsInterpretation, std::string> profileMap;
    // Default sRGB ICC profile from https://packages.debian.org/sid/all/icc-profiles-free/filelist
    profileMap.insert(
      std::pair<VipsInterpretation, std::string>(VIPS_INTERPRETATION_sRGB,
                                                 baton->iccProfilePath + "sRGB.icc"));
    // Convert to sRGB using default CMYK profile from http://www.argyllcms.com/cmyk.icm
    profileMap.insert(
      std::pair<VipsInterpretation, std::string>(VIPS_INTERPRETATION_CMYK,
                                                 baton->iccProfilePath + "cmyk.icm"));

    try {
      // Open input
      vips::VImage image;
      ImageType inputImageType;
      std::tie(image, inputImageType) = sharp::OpenInput(baton->input, baton->accessMethod);

      // Limit input images to a given number of pixels, where pixels = width * height
      // Ignore if 0
      if (baton->limitInputPixels > 0 &&
        static_cast<uint64_t>(image.width() * image.height()) > static_cast<uint64_t>(baton->limitInputPixels)) {
        (baton->err).append("Input image exceeds pixel limit");
        return Error();
      }

      // Calculate angle of rotation
      VipsAngle rotation;
      if (baton->useExifOrientation) {
        // Rotate and flip image according to Exif orientation
        bool flip;
        bool flop;
        std::tie(rotation, flip, flop) = CalculateExifRotationAndFlip(sharp::ExifOrientation(image));
        baton->flip = baton->flip || flip;
        baton->flop = baton->flop || flop;
      } else {
        rotation = CalculateAngleRotation(baton->angle);
      }

      // Rotate pre-extract
      if (baton->rotateBeforePreExtract && rotation != VIPS_ANGLE_D0) {
        image = image.rot(rotation);
        sharp::RemoveExifOrientation(image);
      }

      // Trim
      if (baton->trimThreshold > 0.0) {
        image = sharp::Trim(image, baton->trimThreshold);
        baton->trimOffsetLeft = image.xoffset();
        baton->trimOffsetTop = image.yoffset();
      }

      // Pre extraction
      if (baton->topOffsetPre != -1) {
        image = image.extract_area(baton->leftOffsetPre, baton->topOffsetPre, baton->widthPre, baton->heightPre);
      }

      // Get pre-resize image width and height
      int inputWidth = image.width();
      int inputHeight = image.height();
      if (!baton->rotateBeforePreExtract &&
        (rotation == VIPS_ANGLE_D90 || rotation == VIPS_ANGLE_D270)) {
        // Swap input output width and height when rotating by 90 or 270 degrees
        std::swap(inputWidth, inputHeight);
      }

      // Scaling calculations
      double xfactor = 1.0;
      double yfactor = 1.0;
      int targetResizeWidth = baton->width;
      int targetResizeHeight = baton->height;
      if (baton->width > 0 && baton->height > 0) {
        // Fixed width and height
        xfactor = static_cast<double>(inputWidth) / static_cast<double>(baton->width);
        yfactor = static_cast<double>(inputHeight) / static_cast<double>(baton->height);
        switch (baton->canvas) {
          case Canvas::CROP:
            if (xfactor < yfactor) {
              targetResizeHeight = static_cast<int>(round(static_cast<double>(inputHeight) / xfactor));
              yfactor = xfactor;
            } else {
              targetResizeWidth = static_cast<int>(round(static_cast<double>(inputWidth) / yfactor));
              xfactor = yfactor;
            }
            break;
          case Canvas::EMBED:
            if (xfactor > yfactor) {
              targetResizeHeight = static_cast<int>(round(static_cast<double>(inputHeight) / xfactor));
              yfactor = xfactor;
            } else {
              targetResizeWidth = static_cast<int>(round(static_cast<double>(inputWidth) / yfactor));
              xfactor = yfactor;
            }
            break;
          case Canvas::MAX:
            if (xfactor > yfactor) {
              targetResizeHeight = baton->height = static_cast<int>(round(static_cast<double>(inputHeight) / xfactor));
              yfactor = xfactor;
            } else {
              targetResizeWidth = baton->width = static_cast<int>(round(static_cast<double>(inputWidth) / yfactor));
              xfactor = yfactor;
            }
            break;
          case Canvas::MIN:
            if (xfactor < yfactor) {
              targetResizeHeight = baton->height = static_cast<int>(round(static_cast<double>(inputHeight) / xfactor));
              yfactor = xfactor;
            } else {
              targetResizeWidth = baton->width = static_cast<int>(round(static_cast<double>(inputWidth) / yfactor));
              xfactor = yfactor;
            }
            break;
          case Canvas::IGNORE_ASPECT:
            if (!baton->rotateBeforePreExtract &&
              (rotation == VIPS_ANGLE_D90 || rotation == VIPS_ANGLE_D270)) {
              std::swap(xfactor, yfactor);
            }
            break;
        }
      } else if (baton->width > 0) {
        // Fixed width
        xfactor = static_cast<double>(inputWidth) / static_cast<double>(baton->width);
        if (baton->canvas == Canvas::IGNORE_ASPECT) {
          targetResizeHeight = baton->height = inputHeight;
        } else {
          // Auto height
          yfactor = xfactor;
          targetResizeHeight = baton->height = static_cast<int>(round(static_cast<double>(inputHeight) / yfactor));
        }
      } else if (baton->height > 0) {
        // Fixed height
        yfactor = static_cast<double>(inputHeight) / static_cast<double>(baton->height);
        if (baton->canvas == Canvas::IGNORE_ASPECT) {
          targetResizeWidth = baton->width = inputWidth;
        } else {
          // Auto width
          xfactor = yfactor;
          targetResizeWidth = baton->width = static_cast<int>(round(static_cast<double>(inputWidth) / xfactor));
        }
      } else {
        // Identity transform
        baton->width = inputWidth;
        baton->height = inputHeight;
      }

      // Calculate integral box shrink
      int xshrink = std::max(1, static_cast<int>(floor(xfactor)));
      int yshrink = std::max(1, static_cast<int>(floor(yfactor)));

      // Calculate residual float affine transformation
      double xresidual = static_cast<double>(xshrink) / xfactor;
      double yresidual = static_cast<double>(yshrink) / yfactor;

      // Do not enlarge the output if the input width *or* height
      // are already less than the required dimensions
      if (baton->withoutEnlargement) {
        if (inputWidth < baton->width || inputHeight < baton->height) {
          xfactor = 1.0;
          yfactor = 1.0;
          xshrink = 1;
          yshrink = 1;
          xresidual = 1.0;
          yresidual = 1.0;
          baton->width = inputWidth;
          baton->height = inputHeight;
        }
      }

      // If integral x and y shrink are equal, try to use shrink-on-load for JPEG and WebP,
      // but not when applying gamma correction, pre-resize extract or trim
      int shrink_on_load = 1;

      int shrink_on_load_factor = 1;
      // Leave at least a factor of two for the final resize step, when fastShrinkOnLoad: false
      // for more consistent results and avoid occasional small image shifting
      if (!baton->fastShrinkOnLoad) {
        shrink_on_load_factor = 2;
      }
      if (
        xshrink == yshrink && xshrink >= 2 * shrink_on_load_factor &&
        (inputImageType == ImageType::JPEG || inputImageType == ImageType::WEBP) &&
        baton->gamma == 0 && baton->topOffsetPre == -1 && baton->trimThreshold == 0.0
      ) {
        if (xshrink >= 8 * shrink_on_load_factor) {
          xfactor = xfactor / 8;
          yfactor = yfactor / 8;
          shrink_on_load = 8;
        } else if (xshrink >= 4 * shrink_on_load_factor) {
          xfactor = xfactor / 4;
          yfactor = yfactor / 4;
          shrink_on_load = 4;
        } else if (xshrink >= 2 * shrink_on_load_factor) {
          xfactor = xfactor / 2;
          yfactor = yfactor / 2;
          shrink_on_load = 2;
        }
      }
      // Help ensure a final kernel-based reduction to prevent shrink aliasing
      if (shrink_on_load > 1 && (xresidual == 1.0 || yresidual == 1.0)) {
        shrink_on_load = shrink_on_load / 2;
        xfactor = xfactor * 2;
        yfactor = yfactor * 2;
      }
      if (shrink_on_load > 1) {
        // Reload input using shrink-on-load
        vips::VOption *option = VImage::option()
          ->set("access", baton->accessMethod)
          ->set("shrink", shrink_on_load)
          ->set("fail", baton->input->failOnError);
        if (baton->input->buffer != nullptr) {
          VipsBlob *blob = vips_blob_new(nullptr, baton->input->buffer, baton->input->bufferLength);
          if (inputImageType == ImageType::JPEG) {
            // Reload JPEG buffer
            image = VImage::jpegload_buffer(blob, option);
          } else {
            // Reload WebP buffer
            image = VImage::webpload_buffer(blob, option);
          }
          vips_area_unref(reinterpret_cast<VipsArea*>(blob));
        } else {
          if (inputImageType == ImageType::JPEG) {
            // Reload JPEG file
            image = VImage::jpegload(const_cast<char*>(baton->input->file.data()), option);
          } else {
            // Reload WebP file
            image = VImage::webpload(const_cast<char*>(baton->input->file.data()), option);
          }
        }
        // Recalculate integral shrink and double residual
        int const shrunkOnLoadWidth = image.width();
        int const shrunkOnLoadHeight = image.height();
        if (!baton->rotateBeforePreExtract &&
          (rotation == VIPS_ANGLE_D90 || rotation == VIPS_ANGLE_D270)) {
          // Swap when rotating by 90 or 270 degrees
          xfactor = static_cast<double>(shrunkOnLoadWidth) / static_cast<double>(targetResizeHeight);
          yfactor = static_cast<double>(shrunkOnLoadHeight) / static_cast<double>(targetResizeWidth);
        } else {
          xfactor = static_cast<double>(shrunkOnLoadWidth) / static_cast<double>(targetResizeWidth);
          yfactor = static_cast<double>(shrunkOnLoadHeight) / static_cast<double>(targetResizeHeight);
        }
      }

      // Ensure we're using a device-independent colour space
      if (sharp::HasProfile(image) && image.interpretation() != VIPS_INTERPRETATION_LABS) {
        // Convert to sRGB using embedded profile
        try {
          image = image.icc_transform(
            const_cast<char*>(profileMap[VIPS_INTERPRETATION_sRGB].data()), VImage::option()
            ->set("embedded", TRUE)
            ->set("intent", VIPS_INTENT_PERCEPTUAL));
        } catch(...) {
          // Ignore failure of embedded profile
        }
      } else if (image.interpretation() == VIPS_INTERPRETATION_CMYK) {
        image = image.icc_transform(
          const_cast<char*>(profileMap[VIPS_INTERPRETATION_sRGB].data()), VImage::option()
          ->set("input_profile", profileMap[VIPS_INTERPRETATION_CMYK].data())
          ->set("intent", VIPS_INTENT_PERCEPTUAL));
      }

      // Flatten image to remove alpha channel
      if (baton->flatten && HasAlpha(image)) {
        // Scale up 8-bit values to match 16-bit input image
        double const multiplier = sharp::Is16Bit(image.interpretation()) ? 256.0 : 1.0;
        // Background colour
        std::vector<double> background {
          baton->flattenBackground[0] * multiplier,
          baton->flattenBackground[1] * multiplier,
          baton->flattenBackground[2] * multiplier
        };
        image = image.flatten(VImage::option()
          ->set("background", background));
      }

      // Negate the colours in the image
      if (baton->negate) {
        image = image.invert();
      }

      // Gamma encoding (darken)
      if (baton->gamma >= 1 && baton->gamma <= 3) {
        image = sharp::Gamma(image, 1.0 / baton->gamma);
      }

      // Convert to greyscale (linear, therefore after gamma encoding, if any)
      if (baton->greyscale) {
        image = image.colourspace(VIPS_INTERPRETATION_B_W);
      }

      bool const shouldResize = xfactor != 1.0 || yfactor != 1.0;
      bool const shouldBlur = baton->blurSigma != 0.0;
      bool const shouldConv = baton->convKernelWidth * baton->convKernelHeight > 0;
      bool const shouldSharpen = baton->sharpenSigma != 0.0;
      bool const shouldApplyMedian = baton->medianSize > 0;
      bool const shouldComposite = !baton->composite.empty();
      bool const shouldModulate = baton->brightness != 1.0 || baton->saturation != 1.0 || baton->hue != 0.0;

      if (shouldComposite && !HasAlpha(image)) {
        image = sharp::EnsureAlpha(image);
      }

      bool const shouldPremultiplyAlpha = HasAlpha(image) &&
        (shouldResize || shouldBlur || shouldConv || shouldSharpen || shouldComposite);

      // Premultiply image alpha channel before all transformations to avoid
      // dark fringing around bright pixels
      // See: http://entropymine.com/imageworsener/resizealpha/
      if (shouldPremultiplyAlpha) {
        image = image.premultiply();
      }

      // Resize
      if (shouldResize) {
        VipsKernel kernel = static_cast<VipsKernel>(
          vips_enum_from_nick(nullptr, VIPS_TYPE_KERNEL, baton->kernel.data()));
        if (
          kernel != VIPS_KERNEL_NEAREST && kernel != VIPS_KERNEL_CUBIC && kernel != VIPS_KERNEL_LANCZOS2 &&
          kernel != VIPS_KERNEL_LANCZOS3 && kernel != VIPS_KERNEL_MITCHELL
        ) {
          throw vips::VError("Unknown kernel");
        }
        // Ensure shortest edge is at least 1 pixel
        if (image.width() / xfactor < 0.5) {
          xfactor = 2 * image.width();
          baton->width = 1;
        }
        if (image.height() / yfactor < 0.5) {
          yfactor = 2 * image.height();
          baton->height = 1;
        }
        image = image.resize(1.0 / xfactor, VImage::option()
          ->set("vscale", 1.0 / yfactor)
          ->set("kernel", kernel));
      }

      // Rotate
      if (!baton->rotateBeforePreExtract && rotation != VIPS_ANGLE_D0) {
        image = image.rot(rotation);
        sharp::RemoveExifOrientation(image);
      }

      // Flip (mirror about Y axis)
      if (baton->flip) {
        image = image.flip(VIPS_DIRECTION_VERTICAL);
        sharp::RemoveExifOrientation(image);
      }

      // Flop (mirror about X axis)
      if (baton->flop) {
        image = image.flip(VIPS_DIRECTION_HORIZONTAL);
        sharp::RemoveExifOrientation(image);
      }

      // Join additional color channels to the image
      if (baton->joinChannelIn.size() > 0) {
        VImage joinImage;
        ImageType joinImageType = ImageType::UNKNOWN;

        for (unsigned int i = 0; i < baton->joinChannelIn.size(); i++) {
          std::tie(joinImage, joinImageType) = sharp::OpenInput(baton->joinChannelIn[i], baton->accessMethod);
          image = image.bandjoin(joinImage);
        }
        image = image.copy(VImage::option()->set("interpretation", baton->colourspace));
      }

      // Crop/embed
      if (image.width() != baton->width || image.height() != baton->height) {
        if (baton->canvas == Canvas::EMBED) {
          std::vector<double> background;
          std::tie(image, background) = sharp::ApplyAlpha(image, baton->resizeBackground);

          // Embed

          // Calculate where to position the embeded image if gravity specified, else center.
          int left;
          int top;

          left = static_cast<int>(round((baton->width - image.width()) / 2));
          top = static_cast<int>(round((baton->height - image.height()) / 2));

          int width = std::max(image.width(), baton->width);
          int height = std::max(image.height(), baton->height);
          std::tie(left, top) = sharp::CalculateEmbedPosition(
            image.width(), image.height(), baton->width, baton->height, baton->position);

          image = image.embed(left, top, width, height, VImage::option()
            ->set("extend", VIPS_EXTEND_BACKGROUND)
            ->set("background", background));

        } else if (
          baton->canvas != Canvas::IGNORE_ASPECT &&
          (image.width() > baton->width || image.height() > baton->height)
        ) {
          // Crop/max/min
          if (baton->position < 9) {
            // Gravity-based crop
            int left;
            int top;
            std::tie(left, top) = sharp::CalculateCrop(
              image.width(), image.height(), baton->width, baton->height, baton->position);
            int width = std::min(image.width(), baton->width);
            int height = std::min(image.height(), baton->height);
            image = image.extract_area(left, top, width, height);
          } else {
            // Attention-based or Entropy-based crop
            if (baton->width > image.width()) {
              baton->width = image.width();
            }
            if (baton->height > image.height()) {
              baton->height = image.height();
            }
            image = image.tilecache(VImage::option()
              ->set("access", baton->accessMethod)
              ->set("threaded", TRUE));
            image = image.smartcrop(baton->width, baton->height, VImage::option()
              ->set("interesting", baton->position == 16 ? VIPS_INTERESTING_ENTROPY : VIPS_INTERESTING_ATTENTION));
            baton->hasCropOffset = true;
            baton->cropOffsetLeft = static_cast<int>(image.xoffset());
            baton->cropOffsetTop = static_cast<int>(image.yoffset());
          }
        }
      }

      // Rotate by degree
      if (baton->rotationAngle != 0.0) {
        std::vector<double> background;
        std::tie(image, background) = sharp::ApplyAlpha(image, baton->rotationBackground);
        image = image.rotate(baton->rotationAngle, VImage::option()->set("background", background));
      }

      // Post extraction
      if (baton->topOffsetPost != -1) {
        image = image.extract_area(
          baton->leftOffsetPost, baton->topOffsetPost, baton->widthPost, baton->heightPost);
      }

      // Extend edges
      if (baton->extendTop > 0 || baton->extendBottom > 0 || baton->extendLeft > 0 || baton->extendRight > 0) {
        std::vector<double> background;
        std::tie(image, background) = sharp::ApplyAlpha(image, baton->extendBackground);

        // Embed
        baton->width = image.width() + baton->extendLeft + baton->extendRight;
        baton->height = image.height() + baton->extendTop + baton->extendBottom;

        image = image.embed(baton->extendLeft, baton->extendTop, baton->width, baton->height,
          VImage::option()->set("extend", VIPS_EXTEND_BACKGROUND)->set("background", background));
      }
      // Median - must happen before blurring, due to the utility of blurring after thresholding
      if (shouldApplyMedian) {
        image = image.median(baton->medianSize);
      }
      // Threshold - must happen before blurring, due to the utility of blurring after thresholding
      if (baton->threshold != 0) {
        image = sharp::Threshold(image, baton->threshold, baton->thresholdGrayscale);
      }

      // Blur
      if (shouldBlur) {
        image = sharp::Blur(image, baton->blurSigma);
      }

      // Convolve
      if (shouldConv) {
        image = sharp::Convolve(image,
          baton->convKernelWidth, baton->convKernelHeight,
          baton->convKernelScale, baton->convKernelOffset,
          baton->convKernel);
      }

      // Recomb
      if (baton->recombMatrix != NULL) {
        image = sharp::Recomb(image, baton->recombMatrix);
      }

      if (shouldModulate) {
        image = sharp::Modulate(image, baton->brightness, baton->saturation, baton->hue);
      }

      // Sharpen
      if (shouldSharpen) {
        image = sharp::Sharpen(image, baton->sharpenSigma, baton->sharpenFlat, baton->sharpenJagged);
      }

      // Composite
      if (shouldComposite) {
        for (Composite *composite : baton->composite) {
          VImage compositeImage;
          ImageType compositeImageType = ImageType::UNKNOWN;
          std::tie(compositeImage, compositeImageType) = OpenInput(composite->input, baton->accessMethod);
          // Verify within current dimensions
          if (compositeImage.width() > image.width() || compositeImage.height() > image.height()) {
            throw vips::VError("Image to composite must have same dimensions or smaller");
          }
          // Check if overlay is tiled
          if (composite->tile) {
            int across = 0;
            int down = 0;
            // Use gravity in overlay
            if (compositeImage.width() <= baton->width) {
              across = static_cast<int>(ceil(static_cast<double>(image.width()) / compositeImage.width()));
            }
            if (compositeImage.height() <= baton->height) {
              down = static_cast<int>(ceil(static_cast<double>(image.height()) / compositeImage.height()));
            }
            if (across != 0 || down != 0) {
              int left;
              int top;
              compositeImage = compositeImage.replicate(across, down);
              if (composite->left >= 0 && composite->top >= 0) {
                std::tie(left, top) = sharp::CalculateCrop(
                  compositeImage.width(), compositeImage.height(), image.width(), image.height(),
                  composite->left, composite->top);
              } else {
                std::tie(left, top) = sharp::CalculateCrop(
                  compositeImage.width(), compositeImage.height(), image.width(), image.height(), composite->gravity);
              }
              compositeImage = compositeImage.extract_area(left, top, image.width(), image.height());
            }
            // gravity was used for extract_area, set it back to its default value of 0
            composite->gravity = 0;
          }
          // Ensure image to composite is sRGB with premultiplied alpha
          compositeImage = compositeImage.colourspace(VIPS_INTERPRETATION_sRGB);
          if (!HasAlpha(compositeImage)) {
            compositeImage = sharp::EnsureAlpha(compositeImage);
          }
          compositeImage = compositeImage.premultiply();
          // Calculate position
          int left;
          int top;
          if (composite->left >= 0 && composite->top >= 0) {
            // Composite image at given offsets
            std::tie(left, top) = sharp::CalculateCrop(image.width(), image.height(),
              compositeImage.width(), compositeImage.height(), composite->left, composite->top);
          } else {
            // Composite image with given gravity
            std::tie(left, top) = sharp::CalculateCrop(image.width(), image.height(),
              compositeImage.width(), compositeImage.height(), composite->gravity);
          }
          // Composite
          image = image.composite2(compositeImage, composite->mode, VImage::option()
            ->set("premultiplied", TRUE)
            ->set("x", left)
            ->set("y", top));
        }
      }

      // Reverse premultiplication after all transformations:
      if (shouldPremultiplyAlpha) {
        image = image.unpremultiply();
        // Cast pixel values to integer
        if (sharp::Is16Bit(image.interpretation())) {
          image = image.cast(VIPS_FORMAT_USHORT);
        } else {
          image = image.cast(VIPS_FORMAT_UCHAR);
        }
      }
      baton->premultiplied = shouldPremultiplyAlpha;

      // Gamma decoding (brighten)
      if (baton->gammaOut >= 1 && baton->gammaOut <= 3) {
        image = sharp::Gamma(image, baton->gammaOut);
      }

      // Linear adjustment (a * in + b)
      if (baton->linearA != 1.0 || baton->linearB != 0.0) {
        image = sharp::Linear(image, baton->linearA, baton->linearB);
      }

      // Apply normalisation - stretch luminance to cover full dynamic range
      if (baton->normalise) {
        image = sharp::Normalise(image);
      }

      // Apply bitwise boolean operation between images
      if (baton->boolean != nullptr) {
        VImage booleanImage;
        ImageType booleanImageType = ImageType::UNKNOWN;
        std::tie(booleanImage, booleanImageType) = sharp::OpenInput(baton->boolean, baton->accessMethod);
        image = sharp::Boolean(image, booleanImage, baton->booleanOp);
      }

      // Apply per-channel Bandbool bitwise operations after all other operations
      if (baton->bandBoolOp >= VIPS_OPERATION_BOOLEAN_AND && baton->bandBoolOp < VIPS_OPERATION_BOOLEAN_LAST) {
        image = sharp::Bandbool(image, baton->bandBoolOp);
      }

      // Tint the image
      if (baton->tintA < 128.0 || baton->tintB < 128.0) {
        image = sharp::Tint(image, baton->tintA, baton->tintB);
      }

      // Extract an image channel (aka vips band)
      if (baton->extractChannel > -1) {
        if (baton->extractChannel >= image.bands()) {
          (baton->err).append("Cannot extract channel from image. Too few channels in image.");
          return Error();
        }
        VipsInterpretation const interpretation = sharp::Is16Bit(image.interpretation())
          ? VIPS_INTERPRETATION_GREY16
          : VIPS_INTERPRETATION_B_W;
        image = image
          .extract_band(baton->extractChannel)
          .copy(VImage::option()->set("interpretation", interpretation));
      }

      // Remove alpha channel, if any
      if (baton->removeAlpha) {
        image = sharp::RemoveAlpha(image);
      }

      // Ensure alpha channel, if missing
      if (baton->ensureAlpha) {
        image = sharp::EnsureAlpha(image);
      }

      // Convert image to sRGB, if not already
      if (sharp::Is16Bit(image.interpretation())) {
        image = image.cast(VIPS_FORMAT_USHORT);
      }
      if (image.interpretation() != baton->colourspace) {
        // Convert colourspace, pass the current known interpretation so libvips doesn't have to guess
        image = image.colourspace(baton->colourspace, VImage::option()->set("source_space", image.interpretation()));
        // Transform colours from embedded profile to output profile
        if (baton->withMetadata && sharp::HasProfile(image) && profileMap[baton->colourspace] != std::string()) {
          image = image.icc_transform(const_cast<char*>(profileMap[baton->colourspace].data()),
            VImage::option()->set("embedded", TRUE));
        }
      }

      // Override EXIF Orientation tag
      if (baton->withMetadata && baton->withMetadataOrientation != -1) {
        sharp::SetExifOrientation(image, baton->withMetadataOrientation);
      }

      // Number of channels used in output image
      baton->channels = image.bands();
      baton->width = image.width();
      baton->height = image.height();
      // Output
      if (baton->fileOut.empty()) {
        // Buffer output
        if (baton->formatOut == "jpeg" || (baton->formatOut == "input" && inputImageType == ImageType::JPEG)) {
          // Write JPEG to buffer
          sharp::AssertImageTypeDimensions(image, ImageType::JPEG);
          VipsArea *area = VIPS_AREA(image.jpegsave_buffer(VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("Q", baton->jpegQuality)
            ->set("interlace", baton->jpegProgressive)
            ->set("no_subsample", baton->jpegChromaSubsampling == "4:4:4")
            ->set("trellis_quant", baton->jpegTrellisQuantisation)
            ->set("quant_table", baton->jpegQuantisationTable)
            ->set("overshoot_deringing", baton->jpegOvershootDeringing)
            ->set("optimize_scans", baton->jpegOptimiseScans)
            ->set("optimize_coding", baton->jpegOptimiseCoding)));
          baton->bufferOut = static_cast<char*>(area->data);
          baton->bufferOutLength = area->length;
          area->free_fn = nullptr;
          vips_area_unref(area);
          baton->formatOut = "jpeg";
          if (baton->colourspace == VIPS_INTERPRETATION_CMYK) {
            baton->channels = std::min(baton->channels, 4);
          } else {
            baton->channels = std::min(baton->channels, 3);
          }
        } else if (baton->formatOut == "png" || (baton->formatOut == "input" &&
          (inputImageType == ImageType::PNG || inputImageType == ImageType::GIF || inputImageType == ImageType::SVG))) {
          // Write PNG to buffer
          sharp::AssertImageTypeDimensions(image, ImageType::PNG);
          VipsArea *area = VIPS_AREA(image.pngsave_buffer(VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("interlace", baton->pngProgressive)
            ->set("compression", baton->pngCompressionLevel)
            ->set("filter", baton->pngAdaptiveFiltering ? VIPS_FOREIGN_PNG_FILTER_ALL : VIPS_FOREIGN_PNG_FILTER_NONE)
            ->set("palette", baton->pngPalette)
            ->set("Q", baton->pngQuality)
            ->set("colours", baton->pngColours)
            ->set("dither", baton->pngDither)));
          baton->bufferOut = static_cast<char*>(area->data);
          baton->bufferOutLength = area->length;
          area->free_fn = nullptr;
          vips_area_unref(area);
          baton->formatOut = "png";
        } else if (baton->formatOut == "webp" || (baton->formatOut == "input" && inputImageType == ImageType::WEBP)) {
          // Write WEBP to buffer
          sharp::AssertImageTypeDimensions(image, ImageType::WEBP);
          VipsArea *area = VIPS_AREA(image.webpsave_buffer(VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("Q", baton->webpQuality)
            ->set("lossless", baton->webpLossless)
            ->set("near_lossless", baton->webpNearLossless)
            ->set("alpha_q", baton->webpAlphaQuality)));
          baton->bufferOut = static_cast<char*>(area->data);
          baton->bufferOutLength = area->length;
          area->free_fn = nullptr;
          vips_area_unref(area);
          baton->formatOut = "webp";
        } else if (baton->formatOut == "tiff" || (baton->formatOut == "input" && inputImageType == ImageType::TIFF)) {
          // Write TIFF to buffer
          if (baton->tiffCompression == VIPS_FOREIGN_TIFF_COMPRESSION_JPEG) {
            sharp::AssertImageTypeDimensions(image, ImageType::JPEG);
          }
          // Cast pixel values to float, if required
          if (baton->tiffPredictor == VIPS_FOREIGN_TIFF_PREDICTOR_FLOAT) {
            image = image.cast(VIPS_FORMAT_FLOAT);
          }
          VipsArea *area = VIPS_AREA(image.tiffsave_buffer(VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("Q", baton->tiffQuality)
            ->set("squash", baton->tiffSquash)
            ->set("compression", baton->tiffCompression)
            ->set("predictor", baton->tiffPredictor)
            ->set("pyramid", baton->tiffPyramid)
            ->set("tile", baton->tiffTile)
            ->set("tile_height", baton->tiffTileHeight)
            ->set("tile_width", baton->tiffTileWidth)
            ->set("xres", baton->tiffXres)
            ->set("yres", baton->tiffYres)));
          baton->bufferOut = static_cast<char*>(area->data);
          baton->bufferOutLength = area->length;
          area->free_fn = nullptr;
          vips_area_unref(area);
          baton->formatOut = "tiff";
          baton->channels = std::min(baton->channels, 3);
        } else if (baton->formatOut == "raw" || (baton->formatOut == "input" && inputImageType == ImageType::RAW)) {
          // Write raw, uncompressed image data to buffer
          if (baton->greyscale || image.interpretation() == VIPS_INTERPRETATION_B_W) {
            // Extract first band for greyscale image
            image = image[0];
            baton->channels = 1;
          }
          if (image.format() != VIPS_FORMAT_UCHAR) {
            // Cast pixels to uint8 (unsigned char)
            image = image.cast(VIPS_FORMAT_UCHAR);
          }
          // Get raw image data
          baton->bufferOut = static_cast<char*>(image.write_to_memory(&baton->bufferOutLength));
          if (baton->bufferOut == nullptr) {
            (baton->err).append("Could not allocate enough memory for raw output");
            return Error();
          }
          baton->formatOut = "raw";
        } else {
          // Unsupported output format
          (baton->err).append("Unsupported output format ");
          if (baton->formatOut == "input") {
            (baton->err).append(ImageTypeId(inputImageType));
          } else {
            (baton->err).append(baton->formatOut);
          }
          return Error();
        }
      } else {
        // File output
        bool const isJpeg = sharp::IsJpeg(baton->fileOut);
        bool const isPng = sharp::IsPng(baton->fileOut);
        bool const isWebp = sharp::IsWebp(baton->fileOut);
        bool const isTiff = sharp::IsTiff(baton->fileOut);
        bool const isDz = sharp::IsDz(baton->fileOut);
        bool const isDzZip = sharp::IsDzZip(baton->fileOut);
        bool const isV = sharp::IsV(baton->fileOut);
        bool const mightMatchInput = baton->formatOut == "input";
        bool const willMatchInput = mightMatchInput && !(isJpeg || isPng || isWebp || isTiff || isDz || isDzZip || isV);
        if (baton->formatOut == "jpeg" || (mightMatchInput && isJpeg) ||
          (willMatchInput && inputImageType == ImageType::JPEG)) {
          // Write JPEG to file
          sharp::AssertImageTypeDimensions(image, ImageType::JPEG);
          image.jpegsave(const_cast<char*>(baton->fileOut.data()), VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("Q", baton->jpegQuality)
            ->set("interlace", baton->jpegProgressive)
            ->set("no_subsample", baton->jpegChromaSubsampling == "4:4:4")
            ->set("trellis_quant", baton->jpegTrellisQuantisation)
            ->set("quant_table", baton->jpegQuantisationTable)
            ->set("overshoot_deringing", baton->jpegOvershootDeringing)
            ->set("optimize_scans", baton->jpegOptimiseScans)
            ->set("optimize_coding", baton->jpegOptimiseCoding));
          baton->formatOut = "jpeg";
          baton->channels = std::min(baton->channels, 3);
        } else if (baton->formatOut == "png" || (mightMatchInput && isPng) || (willMatchInput &&
          (inputImageType == ImageType::PNG || inputImageType == ImageType::GIF || inputImageType == ImageType::SVG))) {
          // Write PNG to file
          sharp::AssertImageTypeDimensions(image, ImageType::PNG);
          image.pngsave(const_cast<char*>(baton->fileOut.data()), VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("interlace", baton->pngProgressive)
            ->set("compression", baton->pngCompressionLevel)
            ->set("filter", baton->pngAdaptiveFiltering ? VIPS_FOREIGN_PNG_FILTER_ALL : VIPS_FOREIGN_PNG_FILTER_NONE)
            ->set("palette", baton->pngPalette)
            ->set("Q", baton->pngQuality)
            ->set("colours", baton->pngColours)
            ->set("dither", baton->pngDither));
          baton->formatOut = "png";
        } else if (baton->formatOut == "webp" || (mightMatchInput && isWebp) ||
          (willMatchInput && inputImageType == ImageType::WEBP)) {
          // Write WEBP to file
          sharp::AssertImageTypeDimensions(image, ImageType::WEBP);
          image.webpsave(const_cast<char*>(baton->fileOut.data()), VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("Q", baton->webpQuality)
            ->set("lossless", baton->webpLossless)
            ->set("near_lossless", baton->webpNearLossless)
            ->set("alpha_q", baton->webpAlphaQuality));
          baton->formatOut = "webp";
        } else if (baton->formatOut == "tiff" || (mightMatchInput && isTiff) ||
          (willMatchInput && inputImageType == ImageType::TIFF)) {
          // Write TIFF to file
          if (baton->tiffCompression == VIPS_FOREIGN_TIFF_COMPRESSION_JPEG) {
            sharp::AssertImageTypeDimensions(image, ImageType::JPEG);
          }
          image.tiffsave(const_cast<char*>(baton->fileOut.data()), VImage::option()
            ->set("strip", !baton->withMetadata)
            ->set("Q", baton->tiffQuality)
            ->set("squash", baton->tiffSquash)
            ->set("compression", baton->tiffCompression)
            ->set("predictor", baton->tiffPredictor)
            ->set("pyramid", baton->tiffPyramid)
            ->set("tile", baton->tiffTile)
            ->set("tile_height", baton->tiffTileHeight)
            ->set("tile_width", baton->tiffTileWidth)
            ->set("xres", baton->tiffXres)
            ->set("yres", baton->tiffYres));
          baton->formatOut = "tiff";
          baton->channels = std::min(baton->channels, 3);
        } else if (baton->formatOut == "dz" || isDz || isDzZip) {
          if (isDzZip) {
            baton->tileContainer = VIPS_FOREIGN_DZ_CONTAINER_ZIP;
          }
          // Forward format options through suffix
          std::string suffix;
          if (baton->tileFormat == "png") {
            std::vector<std::pair<std::string, std::string>> options {
              {"interlace", baton->pngProgressive ? "TRUE" : "FALSE"},
              {"compression", std::to_string(baton->pngCompressionLevel)},
              {"filter", baton->pngAdaptiveFiltering ? "all" : "none"}
            };
            suffix = AssembleSuffixString(".png", options);
          } else if (baton->tileFormat == "webp") {
            std::vector<std::pair<std::string, std::string>> options {
              {"Q", std::to_string(baton->webpQuality)},
              {"alpha_q", std::to_string(baton->webpAlphaQuality)},
              {"lossless", baton->webpLossless ? "TRUE" : "FALSE"},
              {"near_lossless", baton->webpNearLossless ? "TRUE" : "FALSE"}
            };
            suffix = AssembleSuffixString(".webp", options);
          } else {
            std::string extname = baton->tileLayout == VIPS_FOREIGN_DZ_LAYOUT_GOOGLE
              || baton->tileLayout == VIPS_FOREIGN_DZ_LAYOUT_ZOOMIFY
                ? ".jpg" : ".jpeg";
            std::vector<std::pair<std::string, std::string>> options {
              {"Q", std::to_string(baton->jpegQuality)},
              {"interlace", baton->jpegProgressive ? "TRUE" : "FALSE"},
              {"no_subsample", baton->jpegChromaSubsampling == "4:4:4" ? "TRUE": "FALSE"},
              {"trellis_quant", baton->jpegTrellisQuantisation ? "TRUE" : "FALSE"},
              {"quant_table", std::to_string(baton->jpegQuantisationTable)},
              {"overshoot_deringing", baton->jpegOvershootDeringing ? "TRUE": "FALSE"},
              {"optimize_scans", baton->jpegOptimiseScans ? "TRUE": "FALSE"},
              {"optimize_coding", baton->jpegOptimiseCoding ? "TRUE": "FALSE"}
            };
            suffix = AssembleSuffixString(extname, options);
          }
          // Write DZ to file
          vips::VOption *options = VImage::option()
                                       ->set("strip", !baton->withMetadata)
                                       ->set("tile_size", baton->tileSize)
                                       ->set("overlap", baton->tileOverlap)
                                       ->set("container", baton->tileContainer)
                                       ->set("layout", baton->tileLayout)
                                       ->set("suffix", const_cast<char*>(suffix.data()))
                                       ->set("angle", CalculateAngleRotation(baton->tileAngle));

          // libvips chooses a default depth based on layout. Instead of replicating that logic here by
          // not passing anything - libvips will handle choice
          if (baton->tileDepth < VIPS_FOREIGN_DZ_DEPTH_LAST) {
            options->set("depth", baton->tileDepth);
          }

          image.dzsave(const_cast<char*>(baton->fileOut.data()), options);
          baton->formatOut = "dz";
        } else if (baton->formatOut == "v" || (mightMatchInput && isV) ||
          (willMatchInput && inputImageType == ImageType::VIPS)) {
          // Write V to file
          image.vipssave(const_cast<char*>(baton->fileOut.data()), VImage::option()
            ->set("strip", !baton->withMetadata));
          baton->formatOut = "v";
        } else {
          // Unsupported output format
          (baton->err).append("Unsupported output format " + baton->fileOut);
          return Error();
        }
      }
    } catch (vips::VError const &err) {
      (baton->err).append(err.what());
    }
    // Clean up libvips' per-request data and threads
    vips_error_clear();
    vips_thread_shutdown();
  }

  void HandleOKCallback() {
    using Nan::New;
    using Nan::Set;
    Nan::HandleScope();

    v8::Local<v8::Value> argv[3] = { Nan::Null(), Nan::Null(), Nan::Null() };
    if (!baton->err.empty()) {
      // Error
      argv[0] = Nan::Error(baton->err.data());
    } else {
      int width = baton->width;
      int height = baton->height;
      if (baton->topOffsetPre != -1 && (baton->width == -1 || baton->height == -1)) {
        width = baton->widthPre;
        height = baton->heightPre;
      }
      if (baton->topOffsetPost != -1) {
        width = baton->widthPost;
        height = baton->heightPost;
      }
      // Info Object
      v8::Local<v8::Object> info = New<v8::Object>();
      Set(info, New("format").ToLocalChecked(), New<v8::String>(baton->formatOut).ToLocalChecked());
      Set(info, New("width").ToLocalChecked(), New<v8::Uint32>(static_cast<uint32_t>(width)));
      Set(info, New("height").ToLocalChecked(), New<v8::Uint32>(static_cast<uint32_t>(height)));
      Set(info, New("channels").ToLocalChecked(), New<v8::Uint32>(static_cast<uint32_t>(baton->channels)));
      Set(info, New("premultiplied").ToLocalChecked(), New<v8::Boolean>(baton->premultiplied));
      if (baton->hasCropOffset) {
        Set(info, New("cropOffsetLeft").ToLocalChecked(),
          New<v8::Int32>(static_cast<int32_t>(baton->cropOffsetLeft)));
        Set(info, New("cropOffsetTop").ToLocalChecked(),
          New<v8::Int32>(static_cast<int32_t>(baton->cropOffsetTop)));
      }
      if (baton->trimThreshold > 0.0) {
        Set(info, New("trimOffsetLeft").ToLocalChecked(),
          New<v8::Int32>(static_cast<int32_t>(baton->trimOffsetLeft)));
        Set(info, New("trimOffsetTop").ToLocalChecked(),
          New<v8::Int32>(static_cast<int32_t>(baton->trimOffsetTop)));
      }

      if (baton->bufferOutLength > 0) {
        // Pass ownership of output data to Buffer instance
        argv[1] = Nan::NewBuffer(
          static_cast<char*>(baton->bufferOut), baton->bufferOutLength, sharp::FreeCallback, nullptr)
          .ToLocalChecked();
        // Add buffer size to info
        Set(info, New("size").ToLocalChecked(), New<v8::Uint32>(static_cast<uint32_t>(baton->bufferOutLength)));
        argv[2] = info;
      } else {
        // Add file size to info
        GStatBuf st;
        if (g_stat(baton->fileOut.data(), &st) == 0) {
          Set(info, New("size").ToLocalChecked(), New<v8::Uint32>(static_cast<uint32_t>(st.st_size)));
        }
        argv[1] = info;
      }
    }

    // Dispose of Persistent wrapper around input Buffers so they can be garbage collected
    std::accumulate(buffersToPersist.begin(), buffersToPersist.end(), 0,
      [this](uint32_t index, v8::Local<v8::Object> const buffer) -> uint32_t {
        GetFromPersistent(index);
        return index + 1;
      });

    // Delete baton
    delete baton->input;
    delete baton->boolean;
    for (Composite *composite : baton->composite) {
      delete composite->input;
      delete composite;
    }
    for (sharp::InputDescriptor *input : baton->joinChannelIn) {
      delete input;
    }
    delete baton;

    // Handle warnings
    std::string warning = sharp::VipsWarningPop();
    while (!warning.empty()) {
      v8::Local<v8::Value> message[1] = { New(warning).ToLocalChecked() };
      debuglog->Call(1, message, async_resource);
      warning = sharp::VipsWarningPop();
    }

    // Decrement processing task counter
    g_atomic_int_dec_and_test(&sharp::counterProcess);
    v8::Local<v8::Value> queueLength[1] = { New<v8::Uint32>(sharp::counterQueue) };
    queueListener->Call(1, queueLength, async_resource);
    delete queueListener;

    // Return to JavaScript
    callback->Call(3, argv, async_resource);
  }

 private:
  PipelineBaton *baton;
  Nan::Callback *debuglog;
  Nan::Callback *queueListener;
  std::vector<v8::Local<v8::Object>> buffersToPersist;

  /*
    Calculate the angle of rotation and need-to-flip for the given Exif orientation
    By default, returns zero, i.e. no rotation.
  */
  std::tuple<VipsAngle, bool, bool>
  CalculateExifRotationAndFlip(int const exifOrientation) {
    VipsAngle rotate = VIPS_ANGLE_D0;
    bool flip = FALSE;
    bool flop = FALSE;
    switch (exifOrientation) {
      case 6: rotate = VIPS_ANGLE_D90; break;
      case 3: rotate = VIPS_ANGLE_D180; break;
      case 8: rotate = VIPS_ANGLE_D270; break;
      case 2: flop = TRUE; break;  // flop 1
      case 7: flip = TRUE; rotate = VIPS_ANGLE_D90; break;  // flip 6
      case 4: flop = TRUE; rotate = VIPS_ANGLE_D180; break;  // flop 3
      case 5: flip = TRUE; rotate = VIPS_ANGLE_D270; break;  // flip 8
    }
    return std::make_tuple(rotate, flip, flop);
  }

  /*
    Calculate the rotation for the given angle.
    Supports any positive or negative angle that is a multiple of 90.
  */
  VipsAngle
  CalculateAngleRotation(int angle) {
    angle = angle % 360;
    if (angle < 0)
      angle = 360 + angle;
    switch (angle) {
      case 90: return VIPS_ANGLE_D90;
      case 180: return VIPS_ANGLE_D180;
      case 270: return VIPS_ANGLE_D270;
    }
    return VIPS_ANGLE_D0;
  }

  /*
    Assemble the suffix argument to dzsave, which is the format (by extname)
    alongisde comma-separated arguments to the corresponding `formatsave` vips
    action.
  */
  std::string
  AssembleSuffixString(std::string extname, std::vector<std::pair<std::string, std::string>> options) {
    std::string argument;
    for (auto const &option : options) {
      if (!argument.empty()) {
        argument += ",";
      }
      argument += option.first + "=" + option.second;
    }
    return extname + "[" + argument + "]";
  }

  /*
    Clear all thread-local data.
  */
  void Error() {
    // Clean up libvips' per-request data and threads
    vips_error_clear();
    vips_thread_shutdown();
  }
};

/*
  pipeline(options, output, callback)
*/
NAN_METHOD(pipeline) {
  using sharp::HasAttr;
  using sharp::AttrTo;
  using sharp::AttrAs;
  using sharp::AttrAsStr;
  using sharp::AttrAsRgba;
  using sharp::CreateInputDescriptor;

  // Input Buffers must not undergo GC compaction during processing
  std::vector<v8::Local<v8::Object>> buffersToPersist;

  // V8 objects are converted to non-V8 types held in the baton struct
  PipelineBaton *baton = new PipelineBaton;
  v8::Local<v8::Object> options = info[0].As<v8::Object>();

  // Input
  baton->input = CreateInputDescriptor(AttrAs<v8::Object>(options, "input"), buffersToPersist);

  // ICC profile to use when input CMYK image has no embedded profile
  baton->iccProfilePath = AttrAsStr(options, "iccProfilePath");
  baton->accessMethod = AttrTo<bool>(options, "sequentialRead") ?
    VIPS_ACCESS_SEQUENTIAL : VIPS_ACCESS_RANDOM;
  // Limit input images to a given number of pixels, where pixels = width * height
  baton->limitInputPixels = AttrTo<int32_t>(options, "limitInputPixels");
  // Extract image options
  baton->topOffsetPre = AttrTo<int32_t>(options, "topOffsetPre");
  baton->leftOffsetPre = AttrTo<int32_t>(options, "leftOffsetPre");
  baton->widthPre = AttrTo<int32_t>(options, "widthPre");
  baton->heightPre = AttrTo<int32_t>(options, "heightPre");
  baton->topOffsetPost = AttrTo<int32_t>(options, "topOffsetPost");
  baton->leftOffsetPost = AttrTo<int32_t>(options, "leftOffsetPost");
  baton->widthPost = AttrTo<int32_t>(options, "widthPost");
  baton->heightPost = AttrTo<int32_t>(options, "heightPost");
  // Output image dimensions
  baton->width = AttrTo<int32_t>(options, "width");
  baton->height = AttrTo<int32_t>(options, "height");
  // Canvas option
  std::string canvas = AttrAsStr(options, "canvas");
  if (canvas == "crop") {
    baton->canvas = Canvas::CROP;
  } else if (canvas == "embed") {
    baton->canvas = Canvas::EMBED;
  } else if (canvas == "max") {
    baton->canvas = Canvas::MAX;
  } else if (canvas == "min") {
    baton->canvas = Canvas::MIN;
  } else if (canvas == "ignore_aspect") {
    baton->canvas = Canvas::IGNORE_ASPECT;
  }
  // Tint chroma
  baton->tintA = AttrTo<double>(options, "tintA");
  baton->tintB = AttrTo<double>(options, "tintB");
  // Composite
  v8::Local<v8::Array> compositeArray = Nan::Get(options, Nan::New("composite").ToLocalChecked())
    .ToLocalChecked().As<v8::Array>();
  int const compositeArrayLength = AttrTo<uint32_t>(compositeArray, "length");
  for (int i = 0; i < compositeArrayLength; i++) {
    v8::Local<v8::Object> compositeObject = Nan::Get(compositeArray, i).ToLocalChecked().As<v8::Object>();
    Composite *composite = new Composite;
    composite->input = CreateInputDescriptor(AttrAs<v8::Object>(compositeObject, "input"), buffersToPersist);
    composite->mode = static_cast<VipsBlendMode>(
      vips_enum_from_nick(nullptr, VIPS_TYPE_BLEND_MODE, AttrAsStr(compositeObject, "blend").data()));
    composite->gravity = AttrTo<uint32_t>(compositeObject, "gravity");
    composite->left = AttrTo<int32_t>(compositeObject, "left");
    composite->top = AttrTo<int32_t>(compositeObject, "top");
    composite->tile = AttrTo<bool>(compositeObject, "tile");
    baton->composite.push_back(composite);
  }
  // Resize options
  baton->withoutEnlargement = AttrTo<bool>(options, "withoutEnlargement");
  baton->position = AttrTo<int32_t>(options, "position");
  baton->resizeBackground = AttrAsRgba(options, "resizeBackground");
  baton->kernel = AttrAsStr(options, "kernel");
  baton->fastShrinkOnLoad = AttrTo<bool>(options, "fastShrinkOnLoad");
  // Join Channel Options
  if (HasAttr(options, "joinChannelIn")) {
    v8::Local<v8::Object> joinChannelObject = Nan::Get(options, Nan::New("joinChannelIn").ToLocalChecked())
      .ToLocalChecked().As<v8::Object>();
    v8::Local<v8::Array> joinChannelArray = joinChannelObject.As<v8::Array>();
    int joinChannelArrayLength = AttrTo<int32_t>(joinChannelObject, "length");
    for (int i = 0; i < joinChannelArrayLength; i++) {
      baton->joinChannelIn.push_back(
        CreateInputDescriptor(
          Nan::Get(joinChannelArray, i).ToLocalChecked().As<v8::Object>(),
          buffersToPersist));
    }
  }
  // Operators
  baton->flatten = AttrTo<bool>(options, "flatten");
  baton->flattenBackground = AttrAsRgba(options, "flattenBackground");
  baton->negate = AttrTo<bool>(options, "negate");
  baton->blurSigma = AttrTo<double>(options, "blurSigma");
  baton->brightness = AttrTo<double>(options, "brightness");
  baton->saturation = AttrTo<double>(options, "saturation");
  baton->hue = AttrTo<int32_t>(options, "hue");
  baton->medianSize = AttrTo<uint32_t>(options, "medianSize");
  baton->sharpenSigma = AttrTo<double>(options, "sharpenSigma");
  baton->sharpenFlat = AttrTo<double>(options, "sharpenFlat");
  baton->sharpenJagged = AttrTo<double>(options, "sharpenJagged");
  baton->threshold = AttrTo<int32_t>(options, "threshold");
  baton->thresholdGrayscale = AttrTo<bool>(options, "thresholdGrayscale");
  baton->trimThreshold = AttrTo<double>(options, "trimThreshold");
  baton->gamma = AttrTo<double>(options, "gamma");
  baton->gammaOut = AttrTo<double>(options, "gammaOut");
  baton->linearA = AttrTo<double>(options, "linearA");
  baton->linearB = AttrTo<double>(options, "linearB");
  baton->greyscale = AttrTo<bool>(options, "greyscale");
  baton->normalise = AttrTo<bool>(options, "normalise");
  baton->useExifOrientation = AttrTo<bool>(options, "useExifOrientation");
  baton->angle = AttrTo<int32_t>(options, "angle");
  baton->rotationAngle = AttrTo<double>(options, "rotationAngle");
  baton->rotationBackground = AttrAsRgba(options, "rotationBackground");
  baton->rotateBeforePreExtract = AttrTo<bool>(options, "rotateBeforePreExtract");
  baton->flip = AttrTo<bool>(options, "flip");
  baton->flop = AttrTo<bool>(options, "flop");
  baton->extendTop = AttrTo<int32_t>(options, "extendTop");
  baton->extendBottom = AttrTo<int32_t>(options, "extendBottom");
  baton->extendLeft = AttrTo<int32_t>(options, "extendLeft");
  baton->extendRight = AttrTo<int32_t>(options, "extendRight");
  baton->extendBackground = AttrAsRgba(options, "extendBackground");
  baton->extractChannel = AttrTo<int32_t>(options, "extractChannel");

  baton->removeAlpha = AttrTo<bool>(options, "removeAlpha");
  baton->ensureAlpha = AttrTo<bool>(options, "ensureAlpha");
  if (HasAttr(options, "boolean")) {
    baton->boolean = CreateInputDescriptor(AttrAs<v8::Object>(options, "boolean"), buffersToPersist);
    baton->booleanOp = sharp::GetBooleanOperation(AttrAsStr(options, "booleanOp"));
  }
  if (HasAttr(options, "bandBoolOp")) {
    baton->bandBoolOp = sharp::GetBooleanOperation(AttrAsStr(options, "bandBoolOp"));
  }
  if (HasAttr(options, "convKernel")) {
    v8::Local<v8::Object> kernel = AttrAs<v8::Object>(options, "convKernel");
    baton->convKernelWidth = AttrTo<uint32_t>(kernel, "width");
    baton->convKernelHeight = AttrTo<uint32_t>(kernel, "height");
    baton->convKernelScale = AttrTo<double>(kernel, "scale");
    baton->convKernelOffset = AttrTo<double>(kernel, "offset");
    size_t const kernelSize = static_cast<size_t>(baton->convKernelWidth * baton->convKernelHeight);
    baton->convKernel = std::unique_ptr<double[]>(new double[kernelSize]);
    v8::Local<v8::Array> kdata = AttrAs<v8::Array>(kernel, "kernel");
    for (unsigned int i = 0; i < kernelSize; i++) {
      baton->convKernel[i] = AttrTo<double>(kdata, i);
    }
  }
  if (HasAttr(options, "recombMatrix")) {
    baton->recombMatrix = std::unique_ptr<double[]>(new double[9]);
    v8::Local<v8::Array> recombMatrix = AttrAs<v8::Array>(options, "recombMatrix");
    for (unsigned int i = 0; i < 9; i++) {
       baton->recombMatrix[i] = AttrTo<double>(recombMatrix, i);
    }
  }
  baton->colourspace = sharp::GetInterpretation(AttrAsStr(options, "colourspace"));
  if (baton->colourspace == VIPS_INTERPRETATION_ERROR) {
    baton->colourspace = VIPS_INTERPRETATION_sRGB;
  }
  // Output
  baton->formatOut = AttrAsStr(options, "formatOut");
  baton->fileOut = AttrAsStr(options, "fileOut");
  baton->withMetadata = AttrTo<bool>(options, "withMetadata");
  baton->withMetadataOrientation = AttrTo<uint32_t>(options, "withMetadataOrientation");
  // Format-specific
  baton->jpegQuality = AttrTo<uint32_t>(options, "jpegQuality");
  baton->jpegProgressive = AttrTo<bool>(options, "jpegProgressive");
  baton->jpegChromaSubsampling = AttrAsStr(options, "jpegChromaSubsampling");
  baton->jpegTrellisQuantisation = AttrTo<bool>(options, "jpegTrellisQuantisation");
  baton->jpegQuantisationTable = AttrTo<uint32_t>(options, "jpegQuantisationTable");
  baton->jpegOvershootDeringing = AttrTo<bool>(options, "jpegOvershootDeringing");
  baton->jpegOptimiseScans = AttrTo<bool>(options, "jpegOptimiseScans");
  baton->jpegOptimiseCoding = AttrTo<bool>(options, "jpegOptimiseCoding");
  baton->pngProgressive = AttrTo<bool>(options, "pngProgressive");
  baton->pngCompressionLevel = AttrTo<uint32_t>(options, "pngCompressionLevel");
  baton->pngAdaptiveFiltering = AttrTo<bool>(options, "pngAdaptiveFiltering");
  baton->pngPalette = AttrTo<bool>(options, "pngPalette");
  baton->pngQuality = AttrTo<uint32_t>(options, "pngQuality");
  baton->pngColours = AttrTo<uint32_t>(options, "pngColours");
  baton->pngDither = AttrTo<double>(options, "pngDither");
  baton->webpQuality = AttrTo<uint32_t>(options, "webpQuality");
  baton->webpAlphaQuality = AttrTo<uint32_t>(options, "webpAlphaQuality");
  baton->webpLossless = AttrTo<bool>(options, "webpLossless");
  baton->webpNearLossless = AttrTo<bool>(options, "webpNearLossless");
  baton->tiffQuality = AttrTo<uint32_t>(options, "tiffQuality");
  baton->tiffPyramid = AttrTo<bool>(options, "tiffPyramid");
  baton->tiffSquash = AttrTo<bool>(options, "tiffSquash");
  baton->tiffTile = AttrTo<bool>(options, "tiffTile");
  baton->tiffTileWidth = AttrTo<uint32_t>(options, "tiffTileWidth");
  baton->tiffTileHeight = AttrTo<uint32_t>(options, "tiffTileHeight");
  baton->tiffXres = AttrTo<double>(options, "tiffXres");
  baton->tiffYres = AttrTo<double>(options, "tiffYres");
  // tiff compression options
  baton->tiffCompression = static_cast<VipsForeignTiffCompression>(
  vips_enum_from_nick(nullptr, VIPS_TYPE_FOREIGN_TIFF_COMPRESSION,
    AttrAsStr(options, "tiffCompression").data()));
  baton->tiffPredictor = static_cast<VipsForeignTiffPredictor>(
  vips_enum_from_nick(nullptr, VIPS_TYPE_FOREIGN_TIFF_PREDICTOR,
    AttrAsStr(options, "tiffPredictor").data()));

  // Tile output
  baton->tileSize = AttrTo<uint32_t>(options, "tileSize");
  baton->tileOverlap = AttrTo<uint32_t>(options, "tileOverlap");
  std::string tileContainer = AttrAsStr(options, "tileContainer");
  baton->tileAngle = AttrTo<int32_t>(options, "tileAngle");
  if (tileContainer == "zip") {
    baton->tileContainer = VIPS_FOREIGN_DZ_CONTAINER_ZIP;
  } else {
    baton->tileContainer = VIPS_FOREIGN_DZ_CONTAINER_FS;
  }
  std::string tileLayout = AttrAsStr(options, "tileLayout");
  if (tileLayout == "google") {
    baton->tileLayout = VIPS_FOREIGN_DZ_LAYOUT_GOOGLE;
  } else if (tileLayout == "zoomify") {
    baton->tileLayout = VIPS_FOREIGN_DZ_LAYOUT_ZOOMIFY;
  } else {
    baton->tileLayout = VIPS_FOREIGN_DZ_LAYOUT_DZ;
  }
  baton->tileFormat = AttrAsStr(options, "tileFormat");
  std::string tileDepth = AttrAsStr(options, "tileDepth");
  if (tileDepth == "onetile") {
    baton->tileDepth = VIPS_FOREIGN_DZ_DEPTH_ONETILE;
  } else if (tileDepth == "one") {
    baton->tileDepth = VIPS_FOREIGN_DZ_DEPTH_ONE;
  } else if (tileDepth == "onepixel") {
    baton->tileDepth = VIPS_FOREIGN_DZ_DEPTH_ONEPIXEL;
  } else {
    // signal that we do not want to pass any value to dzSave
    baton->tileDepth = VIPS_FOREIGN_DZ_DEPTH_LAST;
  }
  // Force random access for certain operations
  if (baton->accessMethod == VIPS_ACCESS_SEQUENTIAL && (
    baton->trimThreshold > 0.0 || baton->normalise ||
    baton->position == 16 || baton->position == 17)) {
    baton->accessMethod = VIPS_ACCESS_RANDOM;
  }

  // Function to notify of libvips warnings
  Nan::Callback *debuglog = new Nan::Callback(AttrAs<v8::Function>(options, "debuglog"));

  // Function to notify of queue length changes
  Nan::Callback *queueListener = new Nan::Callback(AttrAs<v8::Function>(options, "queueListener"));

  // Join queue for worker thread
  Nan::Callback *callback = new Nan::Callback(info[1].As<v8::Function>());
  Nan::AsyncQueueWorker(new PipelineWorker(callback, baton, debuglog, queueListener, buffersToPersist));

  // Increment queued task counter
  g_atomic_int_inc(&sharp::counterQueue);
  v8::Local<v8::Value> queueLength[1] = { Nan::New<v8::Uint32>(sharp::counterQueue) };
  v8::Local<v8::Object> recv = Nan::New<v8::Object>();
  Nan::Call(*queueListener, recv, 1, queueLength);
}
