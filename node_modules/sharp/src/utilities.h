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

#ifndef SRC_UTILITIES_H_
#define SRC_UTILITIES_H_

#include <nan.h>

NAN_METHOD(cache);
NAN_METHOD(concurrency);
NAN_METHOD(counters);
NAN_METHOD(simd);
NAN_METHOD(libvipsVersion);
NAN_METHOD(format);
NAN_METHOD(_maxColourDistance);

#endif  // SRC_UTILITIES_H_
