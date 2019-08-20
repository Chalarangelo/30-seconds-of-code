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

#include <node.h>
#include <nan.h>
#include <vips/vips8>

#include "common.h"
#include "metadata.h"
#include "pipeline.h"
#include "utilities.h"
#include "stats.h"

NAN_MODULE_INIT(init) {
  vips_init("sharp");

  g_log_set_handler("VIPS", static_cast<GLogLevelFlags>(G_LOG_LEVEL_WARNING),
    static_cast<GLogFunc>(sharp::VipsWarningCallback), nullptr);

  // Methods available to JavaScript
  Nan::Set(target, Nan::New("metadata").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(metadata)).ToLocalChecked());
  Nan::Set(target, Nan::New("pipeline").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(pipeline)).ToLocalChecked());
  Nan::Set(target, Nan::New("cache").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(cache)).ToLocalChecked());
  Nan::Set(target, Nan::New("concurrency").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(concurrency)).ToLocalChecked());
  Nan::Set(target, Nan::New("counters").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(counters)).ToLocalChecked());
  Nan::Set(target, Nan::New("simd").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(simd)).ToLocalChecked());
  Nan::Set(target, Nan::New("libvipsVersion").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(libvipsVersion)).ToLocalChecked());
  Nan::Set(target, Nan::New("format").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(format)).ToLocalChecked());
  Nan::Set(target, Nan::New("_maxColourDistance").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(_maxColourDistance)).ToLocalChecked());
  Nan::Set(target, Nan::New("stats").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(stats)).ToLocalChecked());
}

NODE_MODULE(sharp, init)
