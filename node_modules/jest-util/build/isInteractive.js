'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _isCi() {
  const data = _interopRequireDefault(require('is-ci'));

  _isCi = function _isCi() {
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
var _default =
  !!process.stdout.isTTY && process.env.TERM !== 'dumb' && !_isCi().default;

exports.default = _default;
