'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _events() {
  const data = require('events');

  _events = function _events() {
    return data;
  };

  return data;
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

class TestWatcher extends _events().EventEmitter {
  constructor({isWatchMode}) {
    super();

    _defineProperty(this, 'state', void 0);

    _defineProperty(this, '_isWatchMode', void 0);

    this.state = {
      interrupted: false
    };
    this._isWatchMode = isWatchMode;
  }

  setState(state) {
    Object.assign(this.state, state);
    this.emit('change', this.state);
  }

  isInterrupted() {
    return this.state.interrupted;
  }

  isWatchMode() {
    return this._isWatchMode;
  }
}

exports.default = TestWatcher;
