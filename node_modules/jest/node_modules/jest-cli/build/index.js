'use strict';

function _core() {
  const data = require('@jest/core');

  _core = function _core() {
    return data;
  };

  return data;
}

var _cli = require('./cli');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: remove @jest/core exports for the next major
module.exports = {
  SearchSource: _core().SearchSource,
  TestScheduler: _core().TestScheduler,
  TestWatcher: _core().TestWatcher,
  getVersion: _core().getVersion,
  run: _cli.run,
  runCLI: _core().runCLI
};
