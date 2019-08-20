/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 * @format
 */
'use strict';

var PREFIX = 'client:';

function generateRelayClientID(id, storageKey, index) {
  var key = id + ':' + storageKey;

  if (index != null) {
    key += ':' + index;
  }

  if (key.indexOf(PREFIX) !== 0) {
    key = PREFIX + key;
  }

  return key;
}

module.exports = generateRelayClientID;