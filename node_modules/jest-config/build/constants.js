'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.JEST_CONFIG = exports.PACKAGE_JSON = exports.DEFAULT_REPORTER_LABEL = exports.DEFAULT_JS_PATTERN = exports.NODE_MODULES = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const NODE_MODULES = _path().default.sep + 'node_modules' + _path().default.sep;

exports.NODE_MODULES = NODE_MODULES;
const DEFAULT_JS_PATTERN = '^.+\\.[jt]sx?$';
exports.DEFAULT_JS_PATTERN = DEFAULT_JS_PATTERN;
const DEFAULT_REPORTER_LABEL = 'default';
exports.DEFAULT_REPORTER_LABEL = DEFAULT_REPORTER_LABEL;
const PACKAGE_JSON = 'package.json';
exports.PACKAGE_JSON = PACKAGE_JSON;
const JEST_CONFIG = 'jest.config.js';
exports.JEST_CONFIG = JEST_CONFIG;
