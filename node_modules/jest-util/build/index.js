'use strict';

function _fakeTimers() {
  const data = require('@jest/fake-timers');

  _fakeTimers = function _fakeTimers() {
    return data;
  };

  return data;
}

function _sourceMap() {
  const data = require('@jest/source-map');

  _sourceMap = function _sourceMap() {
    return data;
  };

  return data;
}

function _console() {
  const data = require('@jest/console');

  _console = function _console() {
    return data;
  };

  return data;
}

function _testResult() {
  const data = require('@jest/test-result');

  _testResult = function _testResult() {
    return data;
  };

  return data;
}

var _clearLine = _interopRequireDefault2(require('./clearLine'));

var _createDirectory = _interopRequireDefault2(require('./createDirectory'));

var _ErrorWithStack = _interopRequireDefault2(require('./ErrorWithStack'));

var _getFailedSnapshotTests = _interopRequireDefault2(
  require('./getFailedSnapshotTests')
);

var _installCommonGlobals = _interopRequireDefault2(
  require('./installCommonGlobals')
);

var _interopRequireDefault = _interopRequireDefault2(
  require('./interopRequireDefault')
);

var _isInteractive = _interopRequireDefault2(require('./isInteractive'));

var _isPromise = _interopRequireDefault2(require('./isPromise'));

var _setGlobal = _interopRequireDefault2(require('./setGlobal'));

var _deepCyclicCopy = _interopRequireDefault2(require('./deepCyclicCopy'));

var _convertDescriptorToString = _interopRequireDefault2(
  require('./convertDescriptorToString')
);

var specialChars = _interopRequireWildcard(require('./specialChars'));

var _replacePathSepForGlob = _interopRequireDefault2(
  require('./replacePathSepForGlob')
);

var _testPathPatternToRegExp = _interopRequireDefault2(
  require('./testPathPatternToRegExp')
);

var preRunMessage = _interopRequireWildcard(require('./preRunMessage'));

var _pluralize = _interopRequireDefault2(require('./pluralize'));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault2(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: Remove these exports in the next major
module.exports = {
  BufferedConsole: _console().BufferedConsole,
  Console: _console().CustomConsole,
  ErrorWithStack: _ErrorWithStack.default,
  FakeTimers: _fakeTimers().JestFakeTimers,
  NullConsole: _console().NullConsole,
  clearLine: _clearLine.default,
  convertDescriptorToString: _convertDescriptorToString.default,
  createDirectory: _createDirectory.default,
  deepCyclicCopy: _deepCyclicCopy.default,
  formatTestResults: _testResult().formatTestResults,
  getCallsite: _sourceMap().getCallsite,
  getConsoleOutput: _console().getConsoleOutput,
  getFailedSnapshotTests: _getFailedSnapshotTests.default,
  installCommonGlobals: _installCommonGlobals.default,
  interopRequireDefault: _interopRequireDefault.default,
  isInteractive: _isInteractive.default,
  isPromise: _isPromise.default,
  pluralize: _pluralize.default,
  preRunMessage,
  replacePathSepForGlob: _replacePathSepForGlob.default,
  setGlobal: _setGlobal.default,
  specialChars,
  testPathPatternToRegExp: _testPathPatternToRegExp.default
};
