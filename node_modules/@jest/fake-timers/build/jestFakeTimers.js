'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _jestMessageUtil() {
  const data = require('jest-message-util');

  _jestMessageUtil = function _jestMessageUtil() {
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

const MS_IN_A_YEAR = 31536000000; // TODO: Copied from `jest-util` to avoid cyclic dependency. Import from `jest-util` in the next major

const setGlobal = (globalToMutate, key, value) => {
  // @ts-ignore: no index
  globalToMutate[key] = value;
};

class FakeTimers {
  constructor({global, moduleMocker, timerConfig, config, maxLoops}) {
    _defineProperty(this, '_cancelledImmediates', void 0);

    _defineProperty(this, '_cancelledTicks', void 0);

    _defineProperty(this, '_config', void 0);

    _defineProperty(this, '_disposed', void 0);

    _defineProperty(this, '_fakeTimerAPIs', void 0);

    _defineProperty(this, '_global', void 0);

    _defineProperty(this, '_immediates', void 0);

    _defineProperty(this, '_maxLoops', void 0);

    _defineProperty(this, '_moduleMocker', void 0);

    _defineProperty(this, '_now', void 0);

    _defineProperty(this, '_ticks', void 0);

    _defineProperty(this, '_timerAPIs', void 0);

    _defineProperty(this, '_timers', void 0);

    _defineProperty(this, '_uuidCounter', void 0);

    _defineProperty(this, '_timerConfig', void 0);

    this._global = global;
    this._timerConfig = timerConfig;
    this._config = config;
    this._maxLoops = maxLoops || 100000;
    this._uuidCounter = 1;
    this._moduleMocker = moduleMocker; // Store original timer APIs for future reference

    this._timerAPIs = {
      clearImmediate: global.clearImmediate,
      clearInterval: global.clearInterval,
      clearTimeout: global.clearTimeout,
      nextTick: global.process && global.process.nextTick,
      setImmediate: global.setImmediate,
      setInterval: global.setInterval,
      setTimeout: global.setTimeout
    };
    this.reset();

    this._createMocks();
  }

  clearAllTimers() {
    this._immediates.forEach(immediate =>
      this._fakeClearImmediate(immediate.uuid)
    );

    this._timers.clear();
  }

  dispose() {
    this._disposed = true;
    this.clearAllTimers();
  }

  reset() {
    this._cancelledTicks = {};
    this._cancelledImmediates = {};
    this._now = 0;
    this._ticks = [];
    this._immediates = [];
    this._timers = new Map();
  }

  runAllTicks() {
    this._checkFakeTimers(); // Only run a generous number of ticks and then bail.
    // This is just to help avoid recursive loops

    let i;

    for (i = 0; i < this._maxLoops; i++) {
      const tick = this._ticks.shift();

      if (tick === undefined) {
        break;
      }

      if (!this._cancelledTicks.hasOwnProperty(tick.uuid)) {
        // Callback may throw, so update the map prior calling.
        this._cancelledTicks[tick.uuid] = true;
        tick.callback();
      }
    }

    if (i === this._maxLoops) {
      throw new Error(
        'Ran ' +
          this._maxLoops +
          ' ticks, and there are still more! ' +
          "Assuming we've hit an infinite recursion and bailing out..."
      );
    }
  }

  runAllImmediates() {
    this._checkFakeTimers(); // Only run a generous number of immediates and then bail.

    let i;

    for (i = 0; i < this._maxLoops; i++) {
      const immediate = this._immediates.shift();

      if (immediate === undefined) {
        break;
      }

      this._runImmediate(immediate);
    }

    if (i === this._maxLoops) {
      throw new Error(
        'Ran ' +
          this._maxLoops +
          ' immediates, and there are still more! Assuming ' +
          "we've hit an infinite recursion and bailing out..."
      );
    }
  }

  _runImmediate(immediate) {
    if (!this._cancelledImmediates.hasOwnProperty(immediate.uuid)) {
      // Callback may throw, so update the map prior calling.
      this._cancelledImmediates[immediate.uuid] = true;
      immediate.callback();
    }
  }

  runAllTimers() {
    this._checkFakeTimers();

    this.runAllTicks();
    this.runAllImmediates(); // Only run a generous number of timers and then bail.
    // This is just to help avoid recursive loops

    let i;

    for (i = 0; i < this._maxLoops; i++) {
      const nextTimerHandle = this._getNextTimerHandle(); // If there are no more timer handles, stop!

      if (nextTimerHandle === null) {
        break;
      }

      this._runTimerHandle(nextTimerHandle); // Some of the immediate calls could be enqueued
      // during the previous handling of the timers, we should
      // run them as well.

      if (this._immediates.length) {
        this.runAllImmediates();
      }

      if (this._ticks.length) {
        this.runAllTicks();
      }
    }

    if (i === this._maxLoops) {
      throw new Error(
        'Ran ' +
          this._maxLoops +
          ' timers, and there are still more! ' +
          "Assuming we've hit an infinite recursion and bailing out..."
      );
    }
  }

  runOnlyPendingTimers() {
    // We need to hold the current shape of `this._timers` because existing
    // timers can add new ones to the map and hence would run more than necessary.
    // See https://github.com/facebook/jest/pull/4608 for details
    const timerEntries = Array.from(this._timers.entries());

    this._checkFakeTimers();

    this._immediates.forEach(this._runImmediate, this);

    timerEntries
      .sort(([, left], [, right]) => left.expiry - right.expiry)
      .forEach(([timerHandle]) => this._runTimerHandle(timerHandle));
  }

  advanceTimersToNextTimer(steps = 1) {
    if (steps < 1) {
      return;
    }

    const nextExpiry = Array.from(this._timers.values()).reduce(
      (minExpiry, timer) => {
        if (minExpiry === null || timer.expiry < minExpiry) return timer.expiry;
        return minExpiry;
      },
      null
    );

    if (nextExpiry !== null) {
      this.advanceTimersByTime(nextExpiry - this._now);
      this.advanceTimersToNextTimer(steps - 1);
    }
  }

  advanceTimersByTime(msToRun) {
    this._checkFakeTimers(); // Only run a generous number of timers and then bail.
    // This is just to help avoid recursive loops

    let i;

    for (i = 0; i < this._maxLoops; i++) {
      const timerHandle = this._getNextTimerHandle(); // If there are no more timer handles, stop!

      if (timerHandle === null) {
        break;
      }

      const timerValue = this._timers.get(timerHandle);

      if (timerValue === undefined) {
        break;
      }

      const nextTimerExpiry = timerValue.expiry;

      if (this._now + msToRun < nextTimerExpiry) {
        // There are no timers between now and the target we're running to, so
        // adjust our time cursor and quit
        this._now += msToRun;
        break;
      } else {
        msToRun -= nextTimerExpiry - this._now;
        this._now = nextTimerExpiry;

        this._runTimerHandle(timerHandle);
      }
    }

    if (i === this._maxLoops) {
      throw new Error(
        'Ran ' +
          this._maxLoops +
          ' timers, and there are still more! ' +
          "Assuming we've hit an infinite recursion and bailing out..."
      );
    }
  }

  runWithRealTimers(cb) {
    const prevClearImmediate = this._global.clearImmediate;
    const prevClearInterval = this._global.clearInterval;
    const prevClearTimeout = this._global.clearTimeout;
    const prevNextTick = this._global.process.nextTick;
    const prevSetImmediate = this._global.setImmediate;
    const prevSetInterval = this._global.setInterval;
    const prevSetTimeout = this._global.setTimeout;
    this.useRealTimers();
    let cbErr = null;
    let errThrown = false;

    try {
      cb();
    } catch (e) {
      errThrown = true;
      cbErr = e;
    }

    this._global.clearImmediate = prevClearImmediate;
    this._global.clearInterval = prevClearInterval;
    this._global.clearTimeout = prevClearTimeout;
    this._global.process.nextTick = prevNextTick;
    this._global.setImmediate = prevSetImmediate;
    this._global.setInterval = prevSetInterval;
    this._global.setTimeout = prevSetTimeout;

    if (errThrown) {
      throw cbErr;
    }
  }

  useRealTimers() {
    const global = this._global;
    setGlobal(global, 'clearImmediate', this._timerAPIs.clearImmediate);
    setGlobal(global, 'clearInterval', this._timerAPIs.clearInterval);
    setGlobal(global, 'clearTimeout', this._timerAPIs.clearTimeout);
    setGlobal(global, 'setImmediate', this._timerAPIs.setImmediate);
    setGlobal(global, 'setInterval', this._timerAPIs.setInterval);
    setGlobal(global, 'setTimeout', this._timerAPIs.setTimeout);
    global.process.nextTick = this._timerAPIs.nextTick;
  }

  useFakeTimers() {
    this._createMocks();

    const global = this._global;
    setGlobal(global, 'clearImmediate', this._fakeTimerAPIs.clearImmediate);
    setGlobal(global, 'clearInterval', this._fakeTimerAPIs.clearInterval);
    setGlobal(global, 'clearTimeout', this._fakeTimerAPIs.clearTimeout);
    setGlobal(global, 'setImmediate', this._fakeTimerAPIs.setImmediate);
    setGlobal(global, 'setInterval', this._fakeTimerAPIs.setInterval);
    setGlobal(global, 'setTimeout', this._fakeTimerAPIs.setTimeout);
    global.process.nextTick = this._fakeTimerAPIs.nextTick;
  }

  getTimerCount() {
    this._checkFakeTimers();

    return this._timers.size + this._immediates.length + this._ticks.length;
  }

  _checkFakeTimers() {
    if (this._global.setTimeout !== this._fakeTimerAPIs.setTimeout) {
      this._global.console.warn(
        `A function to advance timers was called but the timers API is not ` +
          `mocked with fake timers. Call \`jest.useFakeTimers()\` in this ` +
          `test or enable fake timers globally by setting ` +
          `\`"timers": "fake"\` in ` +
          `the configuration file. This warning is likely a result of a ` +
          `default configuration change in Jest 15.\n\n` +
          `Release Blog Post: https://jestjs.io/blog/2016/09/01/jest-15.html\n` +
          `Stack Trace:\n` +
          (0, _jestMessageUtil().formatStackTrace)(
            new Error().stack,
            this._config,
            {
              noStackTrace: false
            }
          )
      );
    }
  }

  _createMocks() {
    const fn = (
      impl // @ts-ignore TODO: figure out better typings here
    ) => this._moduleMocker.fn().mockImplementation(impl); // TODO: add better typings; these are mocks, but typed as regular timers

    this._fakeTimerAPIs = {
      clearImmediate: fn(this._fakeClearImmediate.bind(this)),
      clearInterval: fn(this._fakeClearTimer.bind(this)),
      clearTimeout: fn(this._fakeClearTimer.bind(this)),
      nextTick: fn(this._fakeNextTick.bind(this)),
      setImmediate: fn(this._fakeSetImmediate.bind(this)),
      setInterval: fn(this._fakeSetInterval.bind(this)),
      setTimeout: fn(this._fakeSetTimeout.bind(this))
    };
  }

  _fakeClearTimer(timerRef) {
    const uuid = this._timerConfig.refToId(timerRef);

    if (uuid) {
      this._timers.delete(String(uuid));
    }
  }

  _fakeClearImmediate(uuid) {
    this._cancelledImmediates[uuid] = true;
  }

  _fakeNextTick(callback, ...args) {
    if (this._disposed) {
      return;
    }

    const uuid = String(this._uuidCounter++);

    this._ticks.push({
      callback: (function(_callback) {
        function callback() {
          return _callback.apply(this, arguments);
        }

        callback.toString = function() {
          return _callback.toString();
        };

        return callback;
      })(() => callback.apply(null, args)),
      uuid
    });

    const cancelledTicks = this._cancelledTicks;

    this._timerAPIs.nextTick(() => {
      if (!cancelledTicks.hasOwnProperty(uuid)) {
        // Callback may throw, so update the map prior calling.
        cancelledTicks[uuid] = true;
        callback.apply(null, args);
      }
    });
  }

  _fakeSetImmediate(callback, ...args) {
    if (this._disposed) {
      return null;
    }

    const uuid = this._uuidCounter++;

    this._immediates.push({
      callback: (function(_callback2) {
        function callback() {
          return _callback2.apply(this, arguments);
        }

        callback.toString = function() {
          return _callback2.toString();
        };

        return callback;
      })(() => callback.apply(null, args)),
      uuid: String(uuid)
    });

    const cancelledImmediates = this._cancelledImmediates;

    this._timerAPIs.setImmediate(() => {
      if (!cancelledImmediates.hasOwnProperty(uuid)) {
        // Callback may throw, so update the map prior calling.
        cancelledImmediates[String(uuid)] = true;
        callback.apply(null, args);
      }
    });

    return uuid;
  }

  _fakeSetInterval(callback, intervalDelay, ...args) {
    if (this._disposed) {
      return null;
    }

    if (intervalDelay == null) {
      intervalDelay = 0;
    }

    const uuid = this._uuidCounter++;

    this._timers.set(String(uuid), {
      callback: (function(_callback3) {
        function callback() {
          return _callback3.apply(this, arguments);
        }

        callback.toString = function() {
          return _callback3.toString();
        };

        return callback;
      })(() => callback.apply(null, args)),
      expiry: this._now + intervalDelay,
      interval: intervalDelay,
      type: 'interval'
    });

    return this._timerConfig.idToRef(uuid);
  }

  _fakeSetTimeout(callback, delay, ...args) {
    if (this._disposed) {
      return null;
    } // eslint-disable-next-line no-bitwise

    delay = Number(delay) | 0;
    const uuid = this._uuidCounter++;

    this._timers.set(String(uuid), {
      callback: (function(_callback4) {
        function callback() {
          return _callback4.apply(this, arguments);
        }

        callback.toString = function() {
          return _callback4.toString();
        };

        return callback;
      })(() => callback.apply(null, args)),
      expiry: this._now + delay,
      interval: undefined,
      type: 'timeout'
    });

    return this._timerConfig.idToRef(uuid);
  }

  _getNextTimerHandle() {
    let nextTimerHandle = null;
    let soonestTime = MS_IN_A_YEAR;

    this._timers.forEach((timer, uuid) => {
      if (timer.expiry < soonestTime) {
        soonestTime = timer.expiry;
        nextTimerHandle = uuid;
      }
    });

    return nextTimerHandle;
  }

  _runTimerHandle(timerHandle) {
    const timer = this._timers.get(timerHandle);

    if (!timer) {
      return;
    }

    switch (timer.type) {
      case 'timeout':
        const callback = timer.callback;

        this._timers.delete(timerHandle);

        callback();
        break;

      case 'interval':
        timer.expiry = this._now + (timer.interval || 0);
        timer.callback();
        break;

      default:
        throw new Error('Unexpected timer type: ' + timer.type);
    }
  }
}

exports.default = FakeTimers;
