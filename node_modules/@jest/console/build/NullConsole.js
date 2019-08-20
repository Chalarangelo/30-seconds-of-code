'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _CustomConsole = _interopRequireDefault(require('./CustomConsole'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
class NullConsole extends _CustomConsole.default {
  assert() {}

  debug() {}

  dir() {}

  error() {}

  info() {}

  log() {}

  time() {}

  timeEnd() {}

  trace() {}

  warn() {}
}

exports.default = NullConsole;
