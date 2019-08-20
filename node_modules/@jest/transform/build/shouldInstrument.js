'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = shouldInstrument;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _jestRegexUtil() {
  const data = require('jest-regex-util');

  _jestRegexUtil = function _jestRegexUtil() {
    return data;
  };

  return data;
}

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

function _micromatch() {
  const data = _interopRequireDefault(require('micromatch'));

  _micromatch = function _micromatch() {
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
const MOCKS_PATTERN = new RegExp(
  (0, _jestRegexUtil().escapePathForRegex)(
    _path().default.sep + '__mocks__' + _path().default.sep
  )
);

function shouldInstrument(filename, options, config) {
  if (!options.collectCoverage) {
    return false;
  }

  if (
    config.forceCoverageMatch.length &&
    _micromatch().default.any(filename, config.forceCoverageMatch)
  ) {
    return true;
  }

  if (
    !config.testPathIgnorePatterns.some(pattern => !!filename.match(pattern))
  ) {
    if (config.testRegex.some(regex => new RegExp(regex).test(filename))) {
      return false;
    }

    if (
      _micromatch().default.some(
        (0, _jestUtil().replacePathSepForGlob)(filename),
        config.testMatch
      )
    ) {
      return false;
    }
  }

  if (
    // This configuration field contains an object in the form of:
    // {'path/to/file.js': true}
    options.collectCoverageOnlyFrom &&
    !options.collectCoverageOnlyFrom[filename]
  ) {
    return false;
  }

  if (
    // still cover if `only` is specified
    !options.collectCoverageOnlyFrom &&
    options.collectCoverageFrom &&
    !_micromatch().default.some(
      (0, _jestUtil().replacePathSepForGlob)(
        _path().default.relative(config.rootDir, filename)
      ),
      options.collectCoverageFrom
    )
  ) {
    return false;
  }

  if (
    config.coveragePathIgnorePatterns.some(pattern => !!filename.match(pattern))
  ) {
    return false;
  }

  if (config.globalSetup === filename) {
    return false;
  }

  if (config.globalTeardown === filename) {
    return false;
  }

  if (config.setupFiles.includes(filename)) {
    return false;
  }

  if (config.setupFilesAfterEnv.includes(filename)) {
    return false;
  }

  if (MOCKS_PATTERN.test(filename)) {
    return false;
  }

  if (options.changedFiles && !options.changedFiles.has(filename)) {
    return false;
  }

  return true;
}
