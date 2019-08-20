'use strict';

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

function _jestMock() {
  const data = _interopRequireDefault(require('jest-mock'));

  _jestMock = function _jestMock() {
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

function _jsdom() {
  const data = require('jsdom');

  _jsdom = function _jsdom() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
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

class JSDOMEnvironment {
  constructor(config, options = {}) {
    _defineProperty(this, 'dom', void 0);

    _defineProperty(this, 'fakeTimers', void 0);

    _defineProperty(this, 'global', void 0);

    _defineProperty(this, 'errorEventListener', void 0);

    _defineProperty(this, 'moduleMocker', void 0);

    this.dom = new (_jsdom()).JSDOM(
      '<!DOCTYPE html>',
      _objectSpread(
        {
          pretendToBeVisual: true,
          runScripts: 'dangerously',
          url: config.testURL,
          virtualConsole: new (_jsdom()).VirtualConsole().sendTo(
            options.console || console
          )
        },
        config.testEnvironmentOptions
      )
    );
    const global = (this.global = this.dom.window.document.defaultView);

    if (!global) {
      throw new Error('JSDOM did not return a Window object');
    } // Node's error-message stack size is limited at 10, but it's pretty useful
    // to see more than that when a test fails.

    this.global.Error.stackTraceLimit = 100;
    (0, _jestUtil().installCommonGlobals)(global, config.globals); // Report uncaught errors.

    this.errorEventListener = event => {
      if (userErrorListenerCount === 0 && event.error) {
        process.emit('uncaughtException', event.error);
      }
    };

    global.addEventListener('error', this.errorEventListener); // However, don't report them as uncaught if the user listens to 'error' event.
    // In that case, we assume the might have custom error handling logic.

    const originalAddListener = global.addEventListener;
    const originalRemoveListener = global.removeEventListener;
    let userErrorListenerCount = 0;

    global.addEventListener = function(...args) {
      if (args[0] === 'error') {
        userErrorListenerCount++;
      }

      return originalAddListener.apply(this, args);
    };

    global.removeEventListener = function(...args) {
      if (args[0] === 'error') {
        userErrorListenerCount--;
      }

      return originalRemoveListener.apply(this, args);
    };

    this.moduleMocker = new (_jestMock()).default.ModuleMocker(global);
    const timerConfig = {
      idToRef: id => id,
      refToId: ref => ref
    };
    this.fakeTimers = new (_fakeTimers()).JestFakeTimers({
      config,
      global: global,
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

    if (this.global) {
      if (this.errorEventListener) {
        this.global.removeEventListener('error', this.errorEventListener);
      } // Dispose "document" to prevent "load" event from triggering.

      Object.defineProperty(this.global, 'document', {
        value: null
      });
      this.global.close();
    }

    this.errorEventListener = null; // @ts-ignore

    this.global = null;
    this.dom = null;
    this.fakeTimers = null;
    return Promise.resolve();
  }

  runScript(script) {
    if (this.dom) {
      return this.dom.runVMScript(script);
    }

    return null;
  }
}

module.exports = JSDOMEnvironment;
