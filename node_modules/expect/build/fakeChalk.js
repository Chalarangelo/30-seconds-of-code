'use strict';

var _ansiStyles = _interopRequireDefault(require('ansi-styles'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const returnInput = str => str;

const allColorsAsFunc = Object.keys(_ansiStyles.default)
  .map(style => ({
    [style]: returnInput
  }))
  .reduce((acc, cur) => Object.assign(acc, cur));
Object.keys(allColorsAsFunc)
  .map(color => allColorsAsFunc[color])
  .forEach(style => {
    Object.assign(style, allColorsAsFunc);
    Object.assign(returnInput, style);
  });
module.exports = allColorsAsFunc;
