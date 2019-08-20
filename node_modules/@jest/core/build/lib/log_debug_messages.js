'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = logDebugMessages;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const VERSION = require('../../package.json').version;

function logDebugMessages(globalConfig, configs, outputStream) {
  const output = {
    configs,
    globalConfig,
    version: VERSION
  };
  outputStream.write(JSON.stringify(output, null, '  ') + '\n');
}
