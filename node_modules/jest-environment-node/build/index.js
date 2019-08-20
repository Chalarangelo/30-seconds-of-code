'use strict';

function _vm() {
  const data = _interopRequireDefault(require('vm'));

  _vm = function _vm() {
    return data;
  };

  return data;
}

function _jestMock() {
  const data = require('jest-mock');

  _jestMock = function _jestMock() {
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

function _fakeTimers() {
  const data = require('@jest/fake-timers');

  _fakeTimers = function _fakeTimers() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

class NodeEnvironment {
  constructor(config) {
    _defineProperty(this, 'context', void 0);

    _defineProperty(this, 'fakeTimers', void 0);

    _defineProperty(this, 'global', void 0);

    _defineProperty(this, 'moduleMocker', void 0);

    this.context = _vm().default.createContext();

    const global = (this.global = _vm().default.runInContext(
      'this',
      Object.assign(this.context, config.testEnvironmentOptions)
    ));

    global.global = global;
    global.clearInterval = clearInterval;
    global.clearTimeout = clearTimeout;
    global.setInterval = setInterval;
    global.setTimeout = setTimeout;
    global.ArrayBuffer = ArrayBuffer; // URL and URLSearchParams are global in Node >= 10

    if (typeof URL !== 'undefined' && typeof URLSearchParams !== 'undefined') {
      /* global URL, URLSearchParams */
      global.URL = URL;
      global.URLSearchParams = URLSearchParams;
    } // TextDecoder and TextDecoder are global in Node >= 11

    if (
      typeof TextEncoder !== 'undefined' &&
      typeof TextDecoder !== 'undefined'
    ) {
      /* global TextEncoder, TextDecoder */
      global.TextEncoder = TextEncoder;
      global.TextDecoder = TextDecoder;
    }

    (0, _jestUtil().installCommonGlobals)(global, config.globals);
    this.moduleMocker = new (_jestMock()).ModuleMocker(global);

    const timerIdToRef = id => ({
      id,

      ref() {
        return this;
      },

      unref() {
        return this;
      }
    });

    const timerRefToId = timer => (timer && timer.id) || undefined;

    const timerConfig = {
      idToRef: timerIdToRef,
      refToId: timerRefToId
    };
    this.fakeTimers = new (_fakeTimers()).JestFakeTimers({
      config,
      global,
      moduleMocker: this.moduleMocker,
      timerConfig
    });
  }

  setup() {
    return Promise.resolve();
  }

  teardown() {
    if (this.fakeTimers) {
      this.fakeTimers.dispose();
    }

    this.context = null;
    this.fakeTimers = null;
    return Promise.resolve();
  } // TS infers the return type to be `any`, since that's what `runInContext`
  // returns.

  runScript(script) {
    if (this.context) {
      return script.runInContext(this.context);
    }

    return null;
  }
}

module.exports = NodeEnvironment;
