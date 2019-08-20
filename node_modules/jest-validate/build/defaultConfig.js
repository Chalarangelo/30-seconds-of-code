'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _deprecated = require('./deprecated');

var _warnings = require('./warnings');

var _errors = require('./errors');

var _condition = require('./condition');

var _utils = require('./utils');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const validationOptions = {
  comment: '',
  condition: _condition.validationCondition,
  deprecate: _deprecated.deprecationWarning,
  deprecatedConfig: {},
  error: _errors.errorMessage,
  exampleConfig: {},
  recursive: true,
  // Allow NPM-sanctioned comments in package.json. Use a "//" key.
  recursiveBlacklist: ['//'],
  title: {
    deprecation: _utils.DEPRECATION,
    error: _utils.ERROR,
    warning: _utils.WARNING
  },
  unknown: _warnings.unknownOptionWarning
};
var _default = validationOptions;
exports.default = _default;
