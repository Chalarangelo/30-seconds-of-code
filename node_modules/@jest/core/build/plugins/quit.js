'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _jestWatcher() {
  const data = require('jest-watcher');

  _jestWatcher = function _jestWatcher() {
    return data;
  };

  return data;
}

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

class QuitPlugin extends _jestWatcher().BaseWatchPlugin {
  constructor(options) {
    super(options);

    _defineProperty(this, 'isInternal', void 0);

    this.isInternal = true;
  }

  run() {
    var _this = this;

    return _asyncToGenerator(function*() {
      if (typeof _this._stdin.setRawMode === 'function') {
        _this._stdin.setRawMode(false);
      }

      _this._stdout.write('\n');

      process.exit(0);
    })();
  }

  getUsageInfo() {
    return {
      key: 'q',
      prompt: 'quit watch mode'
    };
  }
}

var _default = QuitPlugin;
exports.default = _default;
