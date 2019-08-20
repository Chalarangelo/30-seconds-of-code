'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isRegExpSupported;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function isRegExpSupported(value) {
  try {
    // eslint-disable-next-line no-new
    new RegExp(value);
    return true;
  } catch (e) {
    return false;
  }
}
