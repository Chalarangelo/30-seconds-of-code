'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const LONG_TEST_COLOR = _chalk().default.reset.bold.bgRed; // Explicitly reset for these messages since they can get written out in the
// middle of error logging

const FAIL_TEXT = 'FAIL';
const PASS_TEXT = 'PASS';
const FAIL = _chalk().default.supportsColor
  ? _chalk().default.reset.inverse.bold.red(` ${FAIL_TEXT} `)
  : FAIL_TEXT;
const PASS = _chalk().default.supportsColor
  ? _chalk().default.reset.inverse.bold.green(` ${PASS_TEXT} `)
  : PASS_TEXT;

var _default = (result, globalConfig, projectConfig) => {
  const testPath = result.testFilePath;
  const status =
    result.numFailingTests > 0 || result.testExecError ? FAIL : PASS;
  const runTime = result.perfStats
    ? (result.perfStats.end - result.perfStats.start) / 1000
    : null;
  const testDetail = [];

  if (runTime !== null && runTime > 5) {
    testDetail.push(LONG_TEST_COLOR(runTime + 's'));
  }

  if (result.memoryUsage) {
    const toMB = bytes => Math.floor(bytes / 1024 / 1024);

    testDetail.push(`${toMB(result.memoryUsage)} MB heap size`);
  }

  const projectDisplayName =
    projectConfig && projectConfig.displayName
      ? (0, _utils.printDisplayName)(projectConfig) + ' '
      : '';
  return (
    `${status} ${projectDisplayName}${(0, _utils.formatTestPath)(
      projectConfig ? projectConfig : globalConfig,
      testPath
    )}` + (testDetail.length ? ` (${testDetail.join(', ')})` : '')
  );
};

exports.default = _default;
