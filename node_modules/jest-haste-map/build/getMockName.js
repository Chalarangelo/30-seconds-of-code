'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
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
const MOCKS_PATTERN = _path().default.sep + '__mocks__' + _path().default.sep;

const getMockName = filePath => {
  const mockPath = filePath.split(MOCKS_PATTERN)[1];
  return mockPath
    .substring(0, mockPath.lastIndexOf(_path().default.extname(mockPath)))
    .replace(/\\/g, '/');
};

var _default = getMockName;
exports.default = _default;
