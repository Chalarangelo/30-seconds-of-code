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

#ifndef SRC_PIPELINE_H_
#define SRC_PIPELINE_H_

#include <memory>
#include <string>
#include <vector>

#include <nan.h>
#include <vips/vips8>

#include "./common.h"

NAN_METHOD(pipeline);

enum class Canvas {
  CROP,
  EMBED,
  MAX,
  MIN,
  IGNORE_ASPECT
};

struct Composite {
  sharp::InputDescriptor *input;
  VipsBlendMode mode;
  int gravity;
  int left;
  int top;
  bool tile;

  Composite():
    input(nullptr),
    mode(VIPS_BLEND_MODE_OVER),
    gravity(0),
    left(-1),
    top(-1),
    tile(false) {}
};

struct PipelineBaton {
  sharp::InputDescriptor *input;
  std::string iccProfilePath;
  int limitInputPixels;
  std::string formatOut;
  std::string fileOut;
  void *bufferOut;
  size_t bufferOutLength;
  std::vector<Composite *> composite;
  std::vector<sharp::InputDescriptor *> joinChannelIn;
  int topOffsetPre;
  int leftOffsetPre;
  int widthPre;
  int heightPre;
  int topOffsetPost;
  int leftOffsetPost;
  int widthPost;
  int heightPost;
  int width;
  int height;
  int channels;
  Canvas canvas;
  int position;
  std::vector<double> resizeBackground;
  bool hasCropOffset;
  int cropOffsetLeft;
  int cropOffsetTop;
  bool premultiplied;
  std::string kernel;
  bool fastShrinkOnLoad;
  double tintA;
  double tintB;
  bool flatten;
  std::vector<double> flattenBackground;
  bool negate;
  double blurSigma;
  double brightness;
  double saturation;
  int hue;
  int medianSize;
  double sharpenSigma;
  double sharpenFlat;
  double sharpenJagged;
  int threshold;
  bool thresholdGrayscale;
  double trimThreshold;
  int trimOffsetLeft;
  int trimOffsetTop;
  double linearA;
  double linearB;
  double gamma;
  double gammaOut;
  bool greyscale;
  bool normalise;
  bool useExifOrientation;
  int angle;
  double rotationAngle;
  std::vector<double> rotationBackground;
  bool rotateBeforePreExtract;
  bool flip;
  bool flop;
  int extendTop;
  int extendBottom;
  int extendLeft;
  int extendRight;
  std::vector<double> extendBackground;
  bool withoutEnlargement;
  VipsAccess accessMethod;
  int jpegQuality;
  bool jpegProgressive;
  std::string jpegChromaSubsampling;
  bool jpegTrellisQuantisation;
  int jpegQuantisationTable;
  bool jpegOvershootDeringing;
  bool jpegOptimiseScans;
  bool jpegOptimiseCoding;
  bool pngProgressive;
  int pngCompressionLevel;
  bool pngAdaptiveFiltering;
  bool pngPalette;
  int pngQuality;
  int pngColours;
  double pngDither;
  int webpQuality;
  int webpAlphaQuality;
  bool webpNearLossless;
  bool webpLossless;
  int tiffQuality;
  VipsForeignTiffCompression tiffCompression;
  VipsForeignTiffPredictor tiffPredictor;
  bool tiffPyramid;
  bool tiffSquash;
  bool tiffTile;
  int tiffTileHeight;
  int tiffTileWidth;
  double tiffXres;
  double tiffYres;
  std::string err;
  bool withMetadata;
  int withMetadataOrientation;
  std::unique_ptr<double[]> convKernel;
  int convKernelWidth;
  int convKernelHeight;
  double convKernelScale;
  double convKernelOffset;
  sharp::InputDescriptor *boolean;
  VipsOperationBoolean booleanOp;
  VipsOperationBoolean bandBoolOp;
  int extractChannel;
  bool removeAlpha;
  bool ensureAlpha;
  VipsInterpretation colourspace;
  int tileSize;
  int tileOverlap;
  VipsForeignDzContainer tileContainer;
  VipsForeignDzLayout tileLayout;
  std::string tileFormat;
  int tileAngle;
  VipsForeignDzDepth tileDepth;
  std::unique_ptr<double[]> recombMatrix;

  PipelineBaton():
    input(nullptr),
    limitInputPixels(0),
    bufferOutLength(0),
    topOffsetPre(-1),
    topOffsetPost(-1),
    channels(0),
    canvas(Canvas::CROP),
    position(0),
    resizeBackground{ 0.0, 0.0, 0.0, 255.0 },
    hasCropOffset(false),
    cropOffsetLeft(0),
    cropOffsetTop(0),
    premultiplied(false),
    tintA(128.0),
    tintB(128.0),
    flatten(false),
    flattenBackground{ 0.0, 0.0, 0.0 },
    negate(false),
    blurSigma(0.0),
    brightness(1.0),
    saturation(1.0),
    hue(0.0),
    medianSize(0),
    sharpenSigma(0.0),
    sharpenFlat(1.0),
    sharpenJagged(2.0),
    threshold(0),
    thresholdGrayscale(true),
    trimThreshold(0.0),
    trimOffsetLeft(0),
    trimOffsetTop(0),
    linearA(1.0),
    linearB(0.0),
    gamma(0.0),
    greyscale(false),
    normalise(false),
    useExifOrientation(false),
    angle(0),
    rotationAngle(0.0),
    rotationBackground{ 0.0, 0.0, 0.0, 255.0 },
    flip(false),
    flop(false),
    extendTop(0),
    extendBottom(0),
    extendLeft(0),
    extendRight(0),
    extendBackground{ 0.0, 0.0, 0.0, 255.0 },
    withoutEnlargement(false),
    jpegQuality(80),
    jpegProgressive(false),
    jpegChromaSubsampling("4:2:0"),
    jpegTrellisQuantisation(false),
    jpegQuantisationTable(0),
    jpegOvershootDeringing(false),
    jpegOptimiseScans(false),
    jpegOptimiseCoding(true),
    pngProgressive(false),
    pngCompressionLevel(9),
    pngAdaptiveFiltering(false),
    pngPalette(false),
    pngQuality(100),
    pngColours(256),
    pngDither(1.0),
    webpQuality(80),
    tiffQuality(80),
    tiffCompression(VIPS_FOREIGN_TIFF_COMPRESSION_JPEG),
    tiffPredictor(VIPS_FOREIGN_TIFF_PREDICTOR_HORIZONTAL),
    tiffPyramid(false),
    tiffSquash(false),
    tiffTile(false),
    tiffTileHeight(256),
    tiffTileWidth(256),
    tiffXres(1.0),
    tiffYres(1.0),
    withMetadata(false),
    withMetadataOrientation(-1),
    convKernelWidth(0),
    convKernelHeight(0),
    convKernelScale(0.0),
    convKernelOffset(0.0),
    boolean(nullptr),
    booleanOp(VIPS_OPERATION_BOOLEAN_LAST),
    bandBoolOp(VIPS_OPERATION_BOOLEAN_LAST),
    extractChannel(-1),
    removeAlpha(false),
    ensureAlpha(false),
    colourspace(VIPS_INTERPRETATION_LAST),
    tileSize(256),
    tileOverlap(0),
    tileContainer(VIPS_FOREIGN_DZ_CONTAINER_FS),
    tileLayout(VIPS_FOREIGN_DZ_LAYOUT_DZ),
    tileAngle(0),
    tileDepth(VIPS_FOREIGN_DZ_DEPTH_LAST) {}
};

#endif  // SRC_PIPELINE_H_
