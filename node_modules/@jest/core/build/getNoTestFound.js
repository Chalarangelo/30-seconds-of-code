'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = getNoTestFound;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

var _pluralize = _interopRequireDefault(require('./pluralize'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function getNoTestFound(testRunData, globalConfig) {
  const testFiles = testRunData.reduce(
    (current, testRun) => current + (testRun.matches.total || 0),
    0
  );
  let dataMessage;

  if (globalConfig.runTestsByPath) {
    dataMessage = `Files: ${globalConfig.nonFlagArgs
      .map(p => `"${p}"`)
      .join(', ')}`;
  } else {
    dataMessage = `Pattern: ${_chalk().default.yellow(
      globalConfig.testPathPattern
    )} - 0 matches`;
  }

  return (
    _chalk().default.bold('No tests found, exiting with code 1') +
    '\n' +
    'Run with `--passWithNoTests` to exit with code 0' +
    '\n' +
    `In ${_chalk().default.bold(globalConfig.rootDir)}` +
    '\n' +
    `  ${(0, _pluralize.default)('file', testFiles, 's')} checked across ${(0,
    _pluralize.default)(
      'project',
      testRunData.length,
      's'
    )}. Run with \`--verbose\` for more details.` +
    '\n' +
    dataMessage
  );
}
