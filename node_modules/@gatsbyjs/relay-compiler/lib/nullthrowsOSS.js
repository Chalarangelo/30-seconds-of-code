/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var nullthrows = function nullthrows(x) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Got unexpected null or undefined';

  if (x != null) {
    return x;
  }

  var error = new Error(message);
  error.framesToPop = 1; // Skip nullthrows own stack frame.

  throw error;
};

module.exports = nullthrows;