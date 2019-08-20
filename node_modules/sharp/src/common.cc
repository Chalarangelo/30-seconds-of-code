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

#include <cstdlib>
#include <string>
#include <string.h>
#include <vector>
#include <queue>
#include <mutex>

#include <node.h>
#include <node_buffer.h>
#include <nan.h>
#include <vips/vips8>

#include "common.h"

using vips::VImage;

namespace sharp {

  // Convenience methods to access the attributes of a v8::Object
  bool HasAttr(v8::Local<v8::Object> obj, std::string attr) {
    return Nan::Has(obj, Nan::New(attr).ToLocalChecked()).FromJust();
  }
  std::string AttrAsStr(v8::Local<v8::Object> obj, std::string attr) {
    return *Nan::Utf8String(Nan::Get(obj, Nan::New(attr).ToLocalChecked()).ToLocalChecked());
  }
  std::vector<double> AttrAsRgba(v8::Local<v8::Object> obj, std::string attr) {
    v8::Local<v8::Object> background = AttrAs<v8::Object>(obj, attr);
    std::vector<double> rgba(4);
    for (unsigned int i = 0; i < 4; i++) {
      rgba[i] = AttrTo<double>(background, i);
    }
    return rgba;
  }

  // Create an InputDescriptor instance from a v8::Object describing an input image
  InputDescriptor* CreateInputDescriptor(
    v8::Local<v8::Object> input, std::vector<v8::Local<v8::Object>> &buffersToPersist
  ) {
    Nan::HandleScope();
    InputDescriptor *descriptor = new InputDescriptor;
    if (HasAttr(input, "file")) {
      descriptor->file = AttrAsStr(input, "file");
    } else if (HasAttr(input, "buffer")) {
      v8::Local<v8::Object> buffer = AttrAs<v8::Object>(input, "buffer");
      descriptor->bufferLength = node::Buffer::Length(buffer);
      descriptor->buffer = node::Buffer::Data(buffer);
      buffersToPersist.push_back(buffer);
    }
    descriptor->failOnError = AttrTo<bool>(input, "failOnError");
    // Density for vector-based input
    if (HasAttr(input, "density")) {
      descriptor->density = AttrTo<double>(input, "density");
    }
    // Raw pixel input
    if (HasAttr(input, "rawChannels")) {
      descriptor->rawChannels = AttrTo<uint32_t>(input, "rawChannels");
      descriptor->rawWidth = AttrTo<uint32_t>(input, "rawWidth");
      descriptor->rawHeight = AttrTo<uint32_t>(input, "rawHeight");
    }
    // Multi-page input (GIF, TIFF, PDF)
    if (HasAttr(input, "pages")) {
      descriptor->pages = AttrTo<int32_t>(input, "pages");
    }
    if (HasAttr(input, "page")) {
      descriptor->page = AttrTo<uint32_t>(input, "page");
    }
    // Create new image
    if (HasAttr(input, "createChannels")) {
      descriptor->createChannels = AttrTo<uint32_t>(input, "createChannels");
      descriptor->createWidth = AttrTo<uint32_t>(input, "createWidth");
      descriptor->createHeight = AttrTo<uint32_t>(input, "createHeight");
      descriptor->createBackground = AttrAsRgba(input, "createBackground");
    }
    return descriptor;
  }

  // How many tasks are in the queue?
  volatile int counterQueue = 0;

  // How many tasks are being processed?
  volatile int counterProcess = 0;

  // Filename extension checkers
  static bool EndsWith(std::string const &str, std::string const &end) {
    return str.length() >= end.length() && 0 == str.compare(str.length() - end.length(), end.length(), end);
  }
  bool IsJpeg(std::string const &str) {
    return EndsWith(str, ".jpg") || EndsWith(str, ".jpeg") || EndsWith(str, ".JPG") || EndsWith(str, ".JPEG");
  }
  bool IsPng(std::string const &str) {
    return EndsWith(str, ".png") || EndsWith(str, ".PNG");
  }
  bool IsWebp(std::string const &str) {
    return EndsWith(str, ".webp") || EndsWith(str, ".WEBP");
  }
  bool IsTiff(std::string const &str) {
    return EndsWith(str, ".tif") || EndsWith(str, ".tiff") || EndsWith(str, ".TIF") || EndsWith(str, ".TIFF");
  }
  bool IsDz(std::string const &str) {
    return EndsWith(str, ".dzi") || EndsWith(str, ".DZI");
  }
  bool IsDzZip(std::string const &str) {
    return EndsWith(str, ".zip") || EndsWith(str, ".ZIP") || EndsWith(str, ".szi") || EndsWith(str, ".SZI");
  }
  bool IsV(std::string const &str) {
    return EndsWith(str, ".v") || EndsWith(str, ".V") || EndsWith(str, ".vips") || EndsWith(str, ".VIPS");
  }

  /*
    Provide a string identifier for the given image type.
  */
  std::string ImageTypeId(ImageType const imageType) {
    std::string id;
    switch (imageType) {
      case ImageType::JPEG: id = "jpeg"; break;
      case ImageType::PNG: id = "png"; break;
      case ImageType::WEBP: id = "webp"; break;
      case ImageType::TIFF: id = "tiff"; break;
      case ImageType::GIF: id = "gif"; break;
      case ImageType::SVG: id = "svg"; break;
      case ImageType::PDF: id = "pdf"; break;
      case ImageType::MAGICK: id = "magick"; break;
      case ImageType::OPENSLIDE: id = "openslide"; break;
      case ImageType::PPM: id = "ppm"; break;
      case ImageType::FITS: id = "fits"; break;
      case ImageType::VIPS: id = "v"; break;
      case ImageType::RAW: id = "raw"; break;
      case ImageType::UNKNOWN: id = "unknown"; break;
      case ImageType::MISSING: id = "missing"; break;
    }
    return id;
  }

  /*
    Determine image format of a buffer.
  */
  ImageType DetermineImageType(void *buffer, size_t const length) {
    ImageType imageType = ImageType::UNKNOWN;
    char const *load = vips_foreign_find_load_buffer(buffer, length);
    if (load != NULL) {
      std::string const loader = load;
      if (EndsWith(loader, "JpegBuffer")) {
        imageType = ImageType::JPEG;
      } else if (EndsWith(loader, "PngBuffer")) {
        imageType = ImageType::PNG;
      } else if (EndsWith(loader, "WebpBuffer")) {
        imageType = ImageType::WEBP;
      } else if (EndsWith(loader, "TiffBuffer")) {
        imageType = ImageType::TIFF;
      } else if (EndsWith(loader, "GifBuffer")) {
        imageType = ImageType::GIF;
      } else if (EndsWith(loader, "SvgBuffer")) {
        imageType = ImageType::SVG;
      } else if (EndsWith(loader, "PdfBuffer")) {
        imageType = ImageType::PDF;
      } else if (EndsWith(loader, "MagickBuffer")) {
        imageType = ImageType::MAGICK;
      }
    }
    return imageType;
  }

  /*
    Determine image format, reads the first few bytes of the file
  */
  ImageType DetermineImageType(char const *file) {
    ImageType imageType = ImageType::UNKNOWN;
    char const *load = vips_foreign_find_load(file);
    if (load != nullptr) {
      std::string const loader = load;
      if (EndsWith(loader, "JpegFile")) {
        imageType = ImageType::JPEG;
      } else if (EndsWith(loader, "Png")) {
        imageType = ImageType::PNG;
      } else if (EndsWith(loader, "WebpFile")) {
        imageType = ImageType::WEBP;
      } else if (EndsWith(loader, "Openslide")) {
        imageType = ImageType::OPENSLIDE;
      } else if (EndsWith(loader, "TiffFile")) {
        imageType = ImageType::TIFF;
      } else if (EndsWith(loader, "GifFile")) {
        imageType = ImageType::GIF;
      } else if (EndsWith(loader, "SvgFile")) {
        imageType = ImageType::SVG;
      } else if (EndsWith(loader, "PdfFile")) {
        imageType = ImageType::PDF;
      } else if (EndsWith(loader, "Ppm")) {
        imageType = ImageType::PPM;
      } else if (EndsWith(loader, "Fits")) {
        imageType = ImageType::FITS;
      } else if (EndsWith(loader, "Vips")) {
        imageType = ImageType::VIPS;
      } else if (EndsWith(loader, "Magick") || EndsWith(loader, "MagickFile")) {
        imageType = ImageType::MAGICK;
      }
    } else {
      if (EndsWith(vips::VError().what(), " not found\n")) {
        imageType = ImageType::MISSING;
      }
    }
    return imageType;
  }

  /*
    Does this image type support multiple pages?
  */
  bool ImageTypeSupportsPage(ImageType imageType) {
    return
      imageType == ImageType::GIF ||
      imageType == ImageType::TIFF ||
      imageType == ImageType::PDF;
  }

  /*
    Open an image from the given InputDescriptor (filesystem, compressed buffer, raw pixel data)
  */
  std::tuple<VImage, ImageType> OpenInput(InputDescriptor *descriptor, VipsAccess accessMethod) {
    VImage image;
    ImageType imageType;
    if (descriptor->buffer != nullptr) {
      if (descriptor->rawChannels > 0) {
        // Raw, uncompressed pixel data
        image = VImage::new_from_memory(descriptor->buffer, descriptor->bufferLength,
          descriptor->rawWidth, descriptor->rawHeight, descriptor->rawChannels, VIPS_FORMAT_UCHAR);
        if (descriptor->rawChannels < 3) {
          image.get_image()->Type = VIPS_INTERPRETATION_B_W;
        } else {
          image.get_image()->Type = VIPS_INTERPRETATION_sRGB;
        }
        imageType = ImageType::RAW;
      } else {
        // Compressed data
        imageType = DetermineImageType(descriptor->buffer, descriptor->bufferLength);
        if (imageType != ImageType::UNKNOWN) {
          try {
            vips::VOption *option = VImage::option()
              ->set("access", accessMethod)
              ->set("fail", descriptor->failOnError);
            if (imageType == ImageType::SVG || imageType == ImageType::PDF) {
              option->set("dpi", descriptor->density);
            }
            if (imageType == ImageType::MAGICK) {
              option->set("density", std::to_string(descriptor->density).data());
            }
            if (ImageTypeSupportsPage(imageType)) {
              option->set("n", descriptor->pages);
              option->set("page", descriptor->page);
            }
            image = VImage::new_from_buffer(descriptor->buffer, descriptor->bufferLength, nullptr, option);
            if (imageType == ImageType::SVG || imageType == ImageType::PDF || imageType == ImageType::MAGICK) {
              SetDensity(image, descriptor->density);
            }
          } catch (vips::VError const &err) {
            throw vips::VError(std::string("Input buffer has corrupt header: ") + err.what());
          }
        } else {
          throw vips::VError("Input buffer contains unsupported image format");
        }
      }
    } else {
      if (descriptor->createChannels > 0) {
        // Create new image
        std::vector<double> background = {
          descriptor->createBackground[0],
          descriptor->createBackground[1],
          descriptor->createBackground[2]
        };
        if (descriptor->createChannels == 4) {
          background.push_back(descriptor->createBackground[3]);
        }
        image = VImage::new_matrix(descriptor->createWidth, descriptor->createHeight).new_from_image(background);
        image.get_image()->Type = VIPS_INTERPRETATION_sRGB;
        imageType = ImageType::RAW;
      } else {
        // From filesystem
        imageType = DetermineImageType(descriptor->file.data());
        if (imageType == ImageType::MISSING) {
          throw vips::VError("Input file is missing");
        }
        if (imageType != ImageType::UNKNOWN) {
          try {
            vips::VOption *option = VImage::option()
              ->set("access", accessMethod)
              ->set("fail", descriptor->failOnError);
            if (imageType == ImageType::SVG || imageType == ImageType::PDF) {
              option->set("dpi", descriptor->density);
            }
            if (imageType == ImageType::MAGICK) {
              option->set("density", std::to_string(descriptor->density).data());
            }
            if (ImageTypeSupportsPage(imageType)) {
              option->set("n", descriptor->pages);
              option->set("page", descriptor->page);
            }
            image = VImage::new_from_file(descriptor->file.data(), option);
            if (imageType == ImageType::SVG || imageType == ImageType::PDF || imageType == ImageType::MAGICK) {
              SetDensity(image, descriptor->density);
            }
          } catch (vips::VError const &err) {
            throw vips::VError(std::string("Input file has corrupt header: ") + err.what());
          }
        } else {
          throw vips::VError("Input file contains unsupported image format");
        }
      }
    }
    return std::make_tuple(image, imageType);
  }

  /*
    Does this image have an embedded profile?
  */
  bool HasProfile(VImage image) {
    return (image.get_typeof(VIPS_META_ICC_NAME) != 0) ? TRUE : FALSE;
  }

  /*
    Does this image have an alpha channel?
    Uses colour space interpretation with number of channels to guess this.
  */
  bool HasAlpha(VImage image) {
    int const bands = image.bands();
    VipsInterpretation const interpretation = image.interpretation();
    return (
      (bands == 2 && interpretation == VIPS_INTERPRETATION_B_W) ||
      (bands == 4 && interpretation != VIPS_INTERPRETATION_CMYK) ||
      (bands == 5 && interpretation == VIPS_INTERPRETATION_CMYK));
  }

  /*
    Get EXIF Orientation of image, if any.
  */
  int ExifOrientation(VImage image) {
    int orientation = 0;
    if (image.get_typeof(VIPS_META_ORIENTATION) != 0) {
      orientation = image.get_int(VIPS_META_ORIENTATION);
    }
    return orientation;
  }

  /*
    Set EXIF Orientation of image.
  */
  void SetExifOrientation(VImage image, int const orientation) {
    image.set(VIPS_META_ORIENTATION, orientation);
  }

  /*
    Remove EXIF Orientation from image.
  */
  void RemoveExifOrientation(VImage image) {
    vips_image_remove(image.get_image(), VIPS_META_ORIENTATION);
  }

  /*
    Does this image have a non-default density?
  */
  bool HasDensity(VImage image) {
    return image.xres() > 1.0;
  }

  /*
    Get pixels/mm resolution as pixels/inch density.
  */
  int GetDensity(VImage image) {
    return static_cast<int>(round(image.xres() * 25.4));
  }

  /*
    Set pixels/mm resolution based on a pixels/inch density.
  */
  void SetDensity(VImage image, const double density) {
    const double pixelsPerMm = density / 25.4;
    image.set("Xres", pixelsPerMm);
    image.set("Yres", pixelsPerMm);
    image.set(VIPS_META_RESOLUTION_UNIT, "in");
  }

  /*
    Check the proposed format supports the current dimensions.
  */
  void AssertImageTypeDimensions(VImage image, ImageType const imageType) {
    if (imageType == ImageType::JPEG) {
      if (image.width() > 65535 || image.height() > 65535) {
        throw vips::VError("Processed image is too large for the JPEG format");
      }
    } else if (imageType == ImageType::WEBP) {
      if (image.width() > 16383 || image.height() > 16383) {
        throw vips::VError("Processed image is too large for the WebP format");
      }
    }
  }

  /*
    Called when a Buffer undergoes GC, required to support mixed runtime libraries in Windows
  */
  void FreeCallback(char* data, void* hint) {
    if (data != nullptr) {
      g_free(data);
    }
  }

  /*
    Temporary buffer of warnings
  */
  std::queue<std::string> vipsWarnings;
  std::mutex vipsWarningsMutex;

  /*
    Called with warnings from the glib-registered "VIPS" domain
  */
  void VipsWarningCallback(char const* log_domain, GLogLevelFlags log_level, char const* message, void* ignore) {
    std::lock_guard<std::mutex> lock(vipsWarningsMutex);
    vipsWarnings.emplace(message);
  }

  /*
    Pop the oldest warning message from the queue
  */
  std::string VipsWarningPop() {
    std::string warning;
    std::lock_guard<std::mutex> lock(vipsWarningsMutex);
    if (!vipsWarnings.empty()) {
      warning = vipsWarnings.front();
      vipsWarnings.pop();
    }
    return warning;
  }

  /*
    Calculate the (left, top) coordinates of the output image
    within the input image, applying the given gravity during an embed.

    @Azurebyte: We are basically swapping the inWidth and outWidth, inHeight and outHeight from the CalculateCrop function.
  */
  std::tuple<int, int> CalculateEmbedPosition(int const inWidth, int const inHeight,
    int const outWidth, int const outHeight, int const gravity) {

    int left = 0;
    int top = 0;
    switch (gravity) {
      case 1:
        // North
        left = (outWidth - inWidth) / 2;
        break;
      case 2:
        // East
        left = outWidth - inWidth;
        top = (outHeight - inHeight) / 2;
        break;
      case 3:
        // South
        left = (outWidth - inWidth) / 2;
        top = outHeight - inHeight;
        break;
      case 4:
        // West
        top = (outHeight - inHeight) / 2;
        break;
      case 5:
        // Northeast
        left = outWidth - inWidth;
        break;
      case 6:
        // Southeast
        left = outWidth - inWidth;
        top = outHeight - inHeight;
        break;
      case 7:
        // Southwest
        top = outHeight - inHeight;
        break;
      case 8:
        // Northwest
        // Which is the default is 0,0 so we do not assign anything here.
        break;
      default:
        // Centre
        left = (outWidth - inWidth) / 2;
        top = (outHeight - inHeight) / 2;
    }
    return std::make_tuple(left, top);
  }

  /*
    Calculate the (left, top) coordinates of the output image
    within the input image, applying the given gravity during a crop.
  */
  std::tuple<int, int> CalculateCrop(int const inWidth, int const inHeight,
    int const outWidth, int const outHeight, int const gravity) {

    int left = 0;
    int top = 0;
    switch (gravity) {
      case 1:
        // North
        left = (inWidth - outWidth + 1) / 2;
        break;
      case 2:
        // East
        left = inWidth - outWidth;
        top = (inHeight - outHeight + 1) / 2;
        break;
      case 3:
        // South
        left = (inWidth - outWidth + 1) / 2;
        top = inHeight - outHeight;
        break;
      case 4:
        // West
        top = (inHeight - outHeight + 1) / 2;
        break;
      case 5:
        // Northeast
        left = inWidth - outWidth;
        break;
      case 6:
        // Southeast
        left = inWidth - outWidth;
        top = inHeight - outHeight;
        break;
      case 7:
        // Southwest
        top = inHeight - outHeight;
        break;
      case 8:
        // Northwest
        break;
      default:
        // Centre
        left = (inWidth - outWidth + 1) / 2;
        top = (inHeight - outHeight + 1) / 2;
    }
    return std::make_tuple(left, top);
  }

  /*
    Calculate the (left, top) coordinates of the output image
    within the input image, applying the given x and y offsets.
  */
  std::tuple<int, int> CalculateCrop(int const inWidth, int const inHeight,
    int const outWidth, int const outHeight, int const x, int const y) {

    // default values
    int left = 0;
    int top = 0;

    // assign only if valid
    if (x >= 0 && x < (inWidth - outWidth)) {
      left = x;
    } else if (x >= (inWidth - outWidth)) {
      left = inWidth - outWidth;
    }

    if (y >= 0 && y < (inHeight - outHeight)) {
      top = y;
    } else if (y >= (inHeight - outHeight)) {
      top = inHeight - outHeight;
    }

    // the resulting left and top could have been outside the image after calculation from bottom/right edges
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }

    return std::make_tuple(left, top);
  }

  /*
    Are pixel values in this image 16-bit integer?
  */
  bool Is16Bit(VipsInterpretation const interpretation) {
    return interpretation == VIPS_INTERPRETATION_RGB16 || interpretation == VIPS_INTERPRETATION_GREY16;
  }

  /*
    Return the image alpha maximum. Useful for combining alpha bands. scRGB
    images are 0 - 1 for image data, but the alpha is 0 - 255.
  */
  double MaximumImageAlpha(VipsInterpretation const interpretation) {
    return Is16Bit(interpretation) ? 65535.0 : 255.0;
  }

  /*
    Get boolean operation type from string
  */
  VipsOperationBoolean GetBooleanOperation(std::string const opStr) {
    return static_cast<VipsOperationBoolean>(
      vips_enum_from_nick(nullptr, VIPS_TYPE_OPERATION_BOOLEAN, opStr.data()));
  }

  /*
    Get interpretation type from string
  */
  VipsInterpretation GetInterpretation(std::string const typeStr) {
    return static_cast<VipsInterpretation>(
      vips_enum_from_nick(nullptr, VIPS_TYPE_INTERPRETATION, typeStr.data()));
  }

  /*
    Convert RGBA value to another colourspace
  */
  std::vector<double> GetRgbaAsColourspace(std::vector<double> const rgba, VipsInterpretation const interpretation) {
    int const bands = static_cast<int>(rgba.size());
    if (bands < 3 || interpretation == VIPS_INTERPRETATION_sRGB || interpretation == VIPS_INTERPRETATION_RGB) {
      return rgba;
    } else {
      VImage pixel = VImage::new_matrix(1, 1);
      pixel.set("bands", bands);
      pixel = pixel.new_from_image(rgba);
      pixel = pixel.colourspace(interpretation, VImage::option()->set("source_space", VIPS_INTERPRETATION_sRGB));
      return pixel(0, 0);
    }
  }

  /*
    Apply the alpha channel to a given colour
  */
  std::tuple<VImage, std::vector<double>> ApplyAlpha(VImage image, std::vector<double> colour) {
    // Scale up 8-bit values to match 16-bit input image
    double const multiplier = sharp::Is16Bit(image.interpretation()) ? 256.0 : 1.0;
    // Create alphaColour colour
    std::vector<double> alphaColour;
    if (image.bands() > 2) {
      alphaColour = {
        multiplier * colour[0],
        multiplier * colour[1],
        multiplier * colour[2]
      };
    } else {
      // Convert sRGB to greyscale
      alphaColour = { multiplier * (
        0.2126 * colour[0] +
        0.7152 * colour[1] +
        0.0722 * colour[2])
      };
    }
    // Add alpha channel to alphaColour colour
    if (colour[3] < 255.0 || HasAlpha(image)) {
      alphaColour.push_back(colour[3] * multiplier);
    }
    // Ensure alphaColour colour uses correct colourspace
    alphaColour = sharp::GetRgbaAsColourspace(alphaColour, image.interpretation());
    // Add non-transparent alpha channel, if required
    if (colour[3] < 255.0 && !HasAlpha(image)) {
      image = image.bandjoin(
        VImage::new_matrix(image.width(), image.height()).new_from_image(255 * multiplier));
    }
    return std::make_tuple(image, alphaColour);
  }

}  // namespace sharp
