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

#include <cmath>
#include <string>

#include <node.h>
#include <nan.h>
#include <vips/vips8>
#include <vips/vector.h>

#include "common.h"
#include "operations.h"
#include "utilities.h"

using v8::Boolean;
using v8::Integer;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;

using Nan::HandleScope;
using Nan::New;
using Nan::Set;
using Nan::ThrowError;
using Nan::To;
using Nan::Utf8String;

/*
  Get and set cache limits
*/
NAN_METHOD(cache) {
  HandleScope();

  // Set memory limit
  if (info[0]->IsInt32()) {
    vips_cache_set_max_mem(To<int32_t>(info[0]).FromJust() * 1048576);
  }
  // Set file limit
  if (info[1]->IsInt32()) {
    vips_cache_set_max_files(To<int32_t>(info[1]).FromJust());
  }
  // Set items limit
  if (info[2]->IsInt32()) {
    vips_cache_set_max(To<int32_t>(info[2]).FromJust());
  }

  // Get memory stats
  Local<Object> memory = New<Object>();
  Set(memory, New("current").ToLocalChecked(),
    New<Integer>(static_cast<int>(round(vips_tracked_get_mem() / 1048576))));
  Set(memory, New("high").ToLocalChecked(),
    New<Integer>(static_cast<int>(round(vips_tracked_get_mem_highwater() / 1048576))));
  Set(memory, New("max").ToLocalChecked(),
    New<Integer>(static_cast<int>(round(vips_cache_get_max_mem() / 1048576))));
  // Get file stats
  Local<Object> files = New<Object>();
  Set(files, New("current").ToLocalChecked(), New<Integer>(vips_tracked_get_files()));
  Set(files, New("max").ToLocalChecked(), New<Integer>(vips_cache_get_max_files()));

  // Get item stats
  Local<Object> items = New<Object>();
  Set(items, New("current").ToLocalChecked(), New<Integer>(vips_cache_get_size()));
  Set(items, New("max").ToLocalChecked(), New<Integer>(vips_cache_get_max()));

  Local<Object> cache = New<Object>();
  Set(cache, New("memory").ToLocalChecked(), memory);
  Set(cache, New("files").ToLocalChecked(), files);
  Set(cache, New("items").ToLocalChecked(), items);
  info.GetReturnValue().Set(cache);
}

/*
  Get and set size of thread pool
*/
NAN_METHOD(concurrency) {
  HandleScope();

  // Set concurrency
  if (info[0]->IsInt32()) {
    vips_concurrency_set(To<int32_t>(info[0]).FromJust());
  }
  // Get concurrency
  info.GetReturnValue().Set(New<Integer>(vips_concurrency_get()));
}

/*
  Get internal counters (queued tasks, processing tasks)
*/
NAN_METHOD(counters) {
  using sharp::counterProcess;
  using sharp::counterQueue;

  HandleScope();
  Local<Object> counters = New<Object>();
  Set(counters, New("queue").ToLocalChecked(), New<Integer>(counterQueue));
  Set(counters, New("process").ToLocalChecked(), New<Integer>(counterProcess));
  info.GetReturnValue().Set(counters);
}

/*
  Get and set use of SIMD vector unit instructions
*/
NAN_METHOD(simd) {
  HandleScope();

  // Set state
  if (info[0]->IsBoolean()) {
    vips_vector_set_enabled(To<bool>(info[0]).FromJust());
  }
  // Get state
  info.GetReturnValue().Set(New<Boolean>(vips_vector_isenabled()));
}

/*
  Get libvips version
*/
NAN_METHOD(libvipsVersion) {
  HandleScope();
  char version[9];
  g_snprintf(version, sizeof(version), "%d.%d.%d", vips_version(0), vips_version(1), vips_version(2));
  info.GetReturnValue().Set(New(version).ToLocalChecked());
}

/*
  Get available input/output file/buffer/stream formats
*/
NAN_METHOD(format) {
  HandleScope();

  // Attribute names
  Local<String> attrId = New("id").ToLocalChecked();
  Local<String> attrInput = New("input").ToLocalChecked();
  Local<String> attrOutput = New("output").ToLocalChecked();
  Local<String> attrFile = New("file").ToLocalChecked();
  Local<String> attrBuffer = New("buffer").ToLocalChecked();
  Local<String> attrStream = New("stream").ToLocalChecked();

  // Which load/save operations are available for each compressed format?
  Local<Object> format = New<Object>();
  for (std::string f : {
    "jpeg", "png", "webp", "tiff", "magick", "openslide", "dz", "ppm", "fits", "gif", "svg", "pdf", "v"
  }) {
    // Input
    Local<Boolean> hasInputFile =
      New<Boolean>(vips_type_find("VipsOperation", (f + "load").c_str()));
    Local<Boolean> hasInputBuffer =
      New<Boolean>(vips_type_find("VipsOperation", (f + "load_buffer").c_str()));
    Local<Object> input = New<Object>();
    Set(input, attrFile, hasInputFile);
    Set(input, attrBuffer, hasInputBuffer);
    Set(input, attrStream, hasInputBuffer);
    // Output
    Local<Boolean> hasOutputFile =
      New<Boolean>(vips_type_find("VipsOperation", (f + "save").c_str()));
    Local<Boolean> hasOutputBuffer =
      New<Boolean>(vips_type_find("VipsOperation", (f + "save_buffer").c_str()));
    Local<Object> output = New<Object>();
    Set(output, attrFile, hasOutputFile);
    Set(output, attrBuffer, hasOutputBuffer);
    Set(output, attrStream, hasOutputBuffer);
    // Other attributes
    Local<Object> container = New<Object>();
    Local<String> formatId = New(f).ToLocalChecked();
    Set(container, attrId, formatId);
    Set(container, attrInput, input);
    Set(container, attrOutput, output);
    // Add to set of formats
    Set(format, formatId, container);
  }

  // Raw, uncompressed data
  Local<Object> raw = New<Object>();
  Local<String> rawId = New("raw").ToLocalChecked();
  Set(raw, attrId, rawId);
  Set(format, rawId, raw);
  Local<Boolean> supported = New<Boolean>(true);
  Local<Boolean> unsupported = New<Boolean>(false);
  Local<Object> rawInput = New<Object>();
  Set(rawInput, attrFile, unsupported);
  Set(rawInput, attrBuffer, supported);
  Set(rawInput, attrStream, supported);
  Set(raw, attrInput, rawInput);
  Local<Object> rawOutput = New<Object>();
  Set(rawOutput, attrFile, unsupported);
  Set(rawOutput, attrBuffer, supported);
  Set(rawOutput, attrStream, supported);
  Set(raw, attrOutput, rawOutput);

  info.GetReturnValue().Set(format);
}

/*
  Synchronous, internal-only method used by some of the functional tests.
  Calculates the maximum colour distance using the DE2000 algorithm
  between two images of the same dimensions and number of channels.
*/
NAN_METHOD(_maxColourDistance) {
  using vips::VImage;
  using vips::VError;
  using sharp::DetermineImageType;
  using sharp::ImageType;
  using sharp::HasAlpha;

  HandleScope();

  // Open input files
  VImage image1;
  ImageType imageType1 = DetermineImageType(*Utf8String(info[0]));
  if (imageType1 != ImageType::UNKNOWN) {
    try {
      image1 = VImage::new_from_file(*Utf8String(info[0]));
    } catch (...) {
      return ThrowError("Input file 1 has corrupt header");
    }
  } else {
    return ThrowError("Input file 1 is of an unsupported image format");
  }
  VImage image2;
  ImageType imageType2 = DetermineImageType(*Utf8String(info[1]));
  if (imageType2 != ImageType::UNKNOWN) {
    try {
      image2 = VImage::new_from_file(*Utf8String(info[1]));
    } catch (...) {
      return ThrowError("Input file 2 has corrupt header");
    }
  } else {
    return ThrowError("Input file 2 is of an unsupported image format");
  }
  // Ensure same number of channels
  if (image1.bands() != image2.bands()) {
    return ThrowError("mismatchedBands");
  }
  // Ensure same dimensions
  if (image1.width() != image2.width() || image1.height() != image2.height()) {
    return ThrowError("mismatchedDimensions");
  }

  double maxColourDistance;
  try {
    // Premultiply and remove alpha
    if (HasAlpha(image1)) {
      image1 = image1.premultiply().extract_band(1, VImage::option()->set("n", image1.bands() - 1));
    }
    if (HasAlpha(image2)) {
      image2 = image2.premultiply().extract_band(1, VImage::option()->set("n", image2.bands() - 1));
    }
    // Calculate colour distance
    maxColourDistance = image1.dE00(image2).max();
  } catch (VError const &err) {
    return ThrowError(err.what());
  }

  // Clean up libvips' per-request data and threads
  vips_error_clear();
  vips_thread_shutdown();

  info.GetReturnValue().Set(New<Number>(maxColourDistance));
}
