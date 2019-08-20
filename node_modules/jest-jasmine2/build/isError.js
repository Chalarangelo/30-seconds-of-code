'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isError;

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function isError(potentialError) {
  // duck-type Error, see #2549
  const isError =
    potentialError !== null &&
    typeof potentialError === 'object' &&
    typeof potentialError.message === 'string' &&
    typeof potentialError.name === 'string';
  const message = isError
    ? null
    : `Failed: ${(0, _prettyFormat.default)(potentialError, {
        maxDepth: 3
      })}`;
  return {
    isError,
    message
  };
}
