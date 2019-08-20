'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = createDirectory;

function _mkdirp() {
  const data = _interopRequireDefault(require('mkdirp'));

  _mkdirp = function _mkdirp() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function createDirectory(path) {
  try {
    _mkdirp().default.sync(path, '777');
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e;
    }
  }
}
