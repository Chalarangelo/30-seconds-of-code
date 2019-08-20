'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = getNoTestsFoundMessage;

var _getNoTestFound = _interopRequireDefault(require('./getNoTestFound'));

var _getNoTestFoundRelatedToChangedFiles = _interopRequireDefault(
  require('./getNoTestFoundRelatedToChangedFiles')
);

var _getNoTestFoundVerbose = _interopRequireDefault(
  require('./getNoTestFoundVerbose')
);

var _getNoTestFoundFailed = _interopRequireDefault(
  require('./getNoTestFoundFailed')
);

var _getNoTestFoundPassWithNoTests = _interopRequireDefault(
  require('./getNoTestFoundPassWithNoTests')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function getNoTestsFoundMessage(testRunData, globalConfig) {
  if (globalConfig.onlyFailures) {
    return (0, _getNoTestFoundFailed.default)();
  }

  if (globalConfig.onlyChanged) {
    return (0, _getNoTestFoundRelatedToChangedFiles.default)(globalConfig);
  }

  if (globalConfig.passWithNoTests) {
    return (0, _getNoTestFoundPassWithNoTests.default)();
  }

  return testRunData.length === 1 || globalConfig.verbose
    ? (0, _getNoTestFoundVerbose.default)(testRunData, globalConfig)
    : (0, _getNoTestFound.default)(testRunData, globalConfig);
}
