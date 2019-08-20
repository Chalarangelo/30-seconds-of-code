'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isValidPath;

function _jestSnapshot() {
  const data = require('jest-snapshot');

  _jestSnapshot = function _jestSnapshot() {
    return data;
  };

  return data;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function isValidPath(globalConfig, filePath) {
  return (
    !filePath.includes(globalConfig.coverageDirectory) &&
    !(0, _jestSnapshot().isSnapshotPath)(filePath)
  );
}
