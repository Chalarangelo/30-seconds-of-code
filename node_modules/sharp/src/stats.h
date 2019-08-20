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

#ifndef SRC_STATS_H_
#define SRC_STATS_H_

#include <string>
#include <nan.h>

#include "./common.h"

struct ChannelStats {
  // stats per channel
  int min;
  int max;
  double sum;
  double squaresSum;
  double mean;
  double stdev;
  int minX;
  int minY;
  int maxX;
  int maxY;

  ChannelStats():
    min(0), max(0), sum(0), squaresSum(0), mean(0), stdev(0)
    , minX(0), minY(0), maxX(0), maxY(0) {}

    ChannelStats(int minVal, int maxVal, double sumVal, double squaresSumVal,
                  double meanVal, double stdevVal, int minXVal, int minYVal, int maxXVal, int maxYVal):
    min(minVal), max(maxVal), sum(sumVal), squaresSum(squaresSumVal),
    mean(meanVal), stdev(stdevVal), minX(minXVal), minY(minYVal), maxX(maxXVal), maxY(maxYVal) {}
};

struct StatsBaton {
  // Input
  sharp::InputDescriptor *input;
  VipsAccess accessMethod;

  // Output
  std::vector<ChannelStats> channelStats;
  bool isOpaque;
  double entropy;

  std::string err;

  StatsBaton():
    input(nullptr),
    isOpaque(true),
    entropy(0.0)
    {}
};

NAN_METHOD(stats);

#endif  // SRC_STATS_H_
