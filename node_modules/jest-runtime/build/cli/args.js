'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.options = exports.usage = void 0;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const usage = 'Usage: $0 [--config=<pathToConfigFile>] <file>';
exports.usage = usage;
const options = {
  cache: {
    default: true,
    description:
      'Whether to use the preprocessor cache. Disable ' +
      'the cache using --no-cache.',
    type: 'boolean'
  },
  config: {
    alias: 'c',
    description: 'The path to a Jest config file.',
    type: 'string'
  },
  debug: {
    description: 'Print debugging info about your jest config.',
    type: 'boolean'
  },
  version: {
    alias: 'v',
    description: 'Print the version and exit',
    type: 'boolean'
  },
  watchman: {
    default: true,
    description:
      'Whether to use watchman for file crawling. Disable using ' +
      '--no-watchman.',
    type: 'boolean'
  }
};
exports.options = options;
