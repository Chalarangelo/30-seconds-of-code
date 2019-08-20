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

function _prettyFormat() {
  const data = _interopRequireDefault(require('pretty-format'));

  _prettyFormat = function _prettyFormat() {
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
const format = value =>
  (0, _prettyFormat().default)(value, {
    min: true
  });

var _default = {
  mapCoverage: () => `  Option ${_chalk().default.bold(
    '"mapCoverage"'
  )} has been removed, as it's no longer necessary.

  Please update your configuration.`,
  preprocessorIgnorePatterns: (function(_preprocessorIgnorePatterns) {
    function preprocessorIgnorePatterns(_x) {
      return _preprocessorIgnorePatterns.apply(this, arguments);
    }

    preprocessorIgnorePatterns.toString = function() {
      return _preprocessorIgnorePatterns.toString();
    };

    return preprocessorIgnorePatterns;
  })(
    options => `  Option ${_chalk().default.bold(
      '"preprocessorIgnorePatterns"'
    )} was replaced by ${_chalk().default.bold(
      '"transformIgnorePatterns"'
    )}, which support multiple preprocessors.

  Jest now treats your current configuration as:
  {
    ${_chalk().default.bold(
      '"transformIgnorePatterns"'
    )}: ${_chalk().default.bold(format(options.preprocessorIgnorePatterns))}
  }

  Please update your configuration.`
  ),
  scriptPreprocessor: (function(_scriptPreprocessor) {
    function scriptPreprocessor(_x2) {
      return _scriptPreprocessor.apply(this, arguments);
    }

    scriptPreprocessor.toString = function() {
      return _scriptPreprocessor.toString();
    };

    return scriptPreprocessor;
  })(
    options => `  Option ${_chalk().default.bold(
      '"scriptPreprocessor"'
    )} was replaced by ${_chalk().default.bold(
      '"transform"'
    )}, which support multiple preprocessors.

  Jest now treats your current configuration as:
  {
    ${_chalk().default.bold('"transform"')}: ${_chalk().default.bold(
      `{".*": ${format(options.scriptPreprocessor)}}`
    )}
  }

  Please update your configuration.`
  ),
  setupTestFrameworkScriptFile: (function(_setupTestFrameworkScriptFile) {
    function setupTestFrameworkScriptFile(_x3) {
      return _setupTestFrameworkScriptFile.apply(this, arguments);
    }

    setupTestFrameworkScriptFile.toString = function() {
      return _setupTestFrameworkScriptFile.toString();
    };

    return setupTestFrameworkScriptFile;
  })(
    _options => `  Option ${_chalk().default.bold(
      '"setupTestFrameworkScriptFile"'
    )} was replaced by configuration ${_chalk().default.bold(
      '"setupFilesAfterEnv"'
    )}, which supports multiple paths.

  Please update your configuration.`
  ),
  testPathDirs: (function(_testPathDirs) {
    function testPathDirs(_x4) {
      return _testPathDirs.apply(this, arguments);
    }

    testPathDirs.toString = function() {
      return _testPathDirs.toString();
    };

    return testPathDirs;
  })(
    options => `  Option ${_chalk().default.bold(
      '"testPathDirs"'
    )} was replaced by ${_chalk().default.bold('"roots"')}.

  Jest now treats your current configuration as:
  {
    ${_chalk().default.bold('"roots"')}: ${_chalk().default.bold(
      format(options.testPathDirs)
    )}
  }

  Please update your configuration.
  `
  )
};
exports.default = _default;
