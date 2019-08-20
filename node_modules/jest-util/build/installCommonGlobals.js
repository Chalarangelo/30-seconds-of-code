'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = _default;

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

var _createProcessObject = _interopRequireDefault(
  require('./createProcessObject')
);

var _deepCyclicCopy = _interopRequireDefault(require('./deepCyclicCopy'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DTRACE = Object.keys(global).filter(key => key.startsWith('DTRACE'));

function _default(globalObject, globals) {
  globalObject.process = (0, _createProcessObject.default)();
  const symbol = globalObject.Symbol; // Keep a reference to some globals that Jest needs

  Object.defineProperties(globalObject, {
    [symbol.for('jest-native-promise')]: {
      enumerable: false,
      value: Promise,
      writable: false
    },
    [symbol.for('jest-native-now')]: {
      enumerable: false,
      value: globalObject.Date.now.bind(globalObject.Date),
      writable: false
    },
    [symbol.for('jest-native-read-file')]: {
      enumerable: false,
      value: _fs().default.readFileSync.bind(_fs().default),
      writable: false
    },
    [symbol.for('jest-native-write-file')]: {
      enumerable: false,
      value: _fs().default.writeFileSync.bind(_fs().default),
      writable: false
    },
    [symbol.for('jest-native-exists-file')]: {
      enumerable: false,
      value: _fs().default.existsSync.bind(_fs().default),
      writable: false
    },
    'jest-symbol-do-not-touch': {
      enumerable: false,
      value: symbol,
      writable: false
    }
  }); // Forward some APIs.

  DTRACE.forEach(dtrace => {
    // @ts-ignore: no index
    globalObject[dtrace] = function(...args) {
      // @ts-ignore: no index
      return global[dtrace].apply(this, args);
    };
  }); // Forward some others (this breaks the sandbox but for now it's OK).

  globalObject.Buffer = global.Buffer;
  globalObject.setImmediate = global.setImmediate;
  globalObject.clearImmediate = global.clearImmediate;
  return Object.assign(globalObject, (0, _deepCyclicCopy.default)(globals));
}
