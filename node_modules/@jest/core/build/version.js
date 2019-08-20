'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = getVersion;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Cannot be `import` as it's not under TS root dir
const _require = require('../package.json'),
  VERSION = _require.version;

function getVersion() {
  return VERSION;
}
