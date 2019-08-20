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

#ifndef SRC_METADATA_H_
#define SRC_METADATA_H_

#include <string>
#include <nan.h>

#include "./common.h"

struct MetadataBaton {
  // Input
  sharp::InputDescriptor *input;
  // Output
  std::string format;
  int width;
  int height;
  std::string space;
  int channels;
  std::string depth;
  int density;
  std::string chromaSubsampling;
  bool isProgressive;
  int paletteBitDepth;
  int pages;
  int pageHeight;
  bool hasProfile;
  bool hasAlpha;
  int orientation;
  char *exif;
  size_t exifLength;
  char *icc;
  size_t iccLength;
  char *iptc;
  size_t iptcLength;
  char *xmp;
  size_t xmpLength;
  std::string err;

  MetadataBaton():
    input(nullptr),
    width(0),
    height(0),
    channels(0),
    density(0),
    isProgressive(false),
    paletteBitDepth(0),
    pages(0),
    pageHeight(0),
    hasProfile(false),
    hasAlpha(false),
    orientation(0),
    exif(nullptr),
    exifLength(0),
    icc(nullptr),
    iccLength(0),
    iptc(nullptr),
    iptcLength(0),
    xmp(nullptr),
    xmpLength(0) {}
};

NAN_METHOD(metadata);

#endif  // SRC_METADATA_H_
