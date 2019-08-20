'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
class JestHooks {
  constructor() {
    var _this = this;

    _defineProperty(this, '_listeners', void 0);

    _defineProperty(this, '_subscriber', void 0);

    _defineProperty(this, '_emitter', void 0);

    this._listeners = {
      onFileChange: [],
      onTestRunComplete: [],
      shouldRunTestSuite: []
    };
    this._subscriber = {
      onFileChange: fn => {
        this._listeners.onFileChange.push(fn);
      },
      onTestRunComplete: fn => {
        this._listeners.onTestRunComplete.push(fn);
      },
      shouldRunTestSuite: fn => {
        this._listeners.shouldRunTestSuite.push(fn);
      }
    };
    this._emitter = {
      onFileChange: fs =>
        this._listeners.onFileChange.forEach(listener => listener(fs)),
      onTestRunComplete: results =>
        this._listeners.onTestRunComplete.forEach(listener =>
          listener(results)
        ),
      shouldRunTestSuite: (function() {
        var _shouldRunTestSuite = _asyncToGenerator(function*(testSuiteInfo) {
          const result = yield Promise.all(
            _this._listeners.shouldRunTestSuite.map(listener =>
              listener(testSuiteInfo)
            )
          );
          return result.every(Boolean);
        });

        function shouldRunTestSuite(_x) {
          return _shouldRunTestSuite.apply(this, arguments);
        }

        return shouldRunTestSuite;
      })()
    };
  }

  isUsed(hook) {
    return this._listeners[hook] && this._listeners[hook].length;
  }

  getSubscriber() {
    return this._subscriber;
  }

  getEmitter() {
    return this._emitter;
  }
}

var _default = JestHooks;
exports.default = _default;
