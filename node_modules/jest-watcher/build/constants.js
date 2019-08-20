'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.KEYS = void 0;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const isWindows = process.platform === 'win32';
const KEYS = {
  ARROW_DOWN: '\u001b[B',
  ARROW_LEFT: '\u001b[D',
  ARROW_RIGHT: '\u001b[C',
  ARROW_UP: '\u001b[A',
  BACKSPACE: Buffer.from(isWindows ? '08' : '7f', 'hex').toString(),
  CONTROL_C: '\u0003',
  CONTROL_D: '\u0004',
  ENTER: '\r',
  ESCAPE: '\u001b'
};
exports.KEYS = KEYS;
