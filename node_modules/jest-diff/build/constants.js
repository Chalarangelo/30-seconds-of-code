'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.SIMILAR_MESSAGE = exports.NO_DIFF_MESSAGE = void 0;

var _chalk = _interopRequireDefault(require('chalk'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const NO_DIFF_MESSAGE = _chalk.default.dim(
  'Compared values have no visual difference.'
);

exports.NO_DIFF_MESSAGE = NO_DIFF_MESSAGE;

const SIMILAR_MESSAGE = _chalk.default.dim(
  'Compared values serialize to the same structure.\n' +
    'Printing internal object structure without calling `toJSON` instead.'
);

exports.SIMILAR_MESSAGE = SIMILAR_MESSAGE;
