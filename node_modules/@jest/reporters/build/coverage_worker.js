'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.worker = worker;
Object.defineProperty(exports, 'CoverageWorkerResult', {
  enumerable: true,
  get: function get() {
    return _generateEmptyCoverage.CoverageWorkerResult;
  }
});

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _exit() {
  const data = _interopRequireDefault(require('exit'));

  _exit = function _exit() {
    return data;
  };

  return data;
}

var _generateEmptyCoverage = _interopRequireWildcard(
  require('./generateEmptyCoverage')
);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Make sure uncaught errors are logged before we exit.
process.on('uncaughtException', err => {
  console.error(err.stack);
  (0, _exit().default)(1);
});

function worker({config, globalConfig, path, options}) {
  return (0, _generateEmptyCoverage.default)(
    _fs().default.readFileSync(path, 'utf8'),
    path,
    globalConfig,
    config,
    options && options.changedFiles && new Set(options.changedFiles)
  );
}
