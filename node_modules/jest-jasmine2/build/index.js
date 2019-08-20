'use strict';

var _path = _interopRequireDefault(require('path'));

var _jestUtil = require('jest-util');

var _each = _interopRequireDefault(require('./each'));

var _errorOnPrivate = require('./errorOnPrivate');

var _reporter = _interopRequireDefault(require('./reporter'));

var _jasmineAsyncInstall = _interopRequireDefault(
  require('./jasmineAsyncInstall')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Promise = global[Symbol.for('jest-native-promise')] || global.Promise;

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

const JASMINE = require.resolve('./jasmine/jasmineLight');

function jasmine2(_x, _x2, _x3, _x4, _x5) {
  return _jasmine.apply(this, arguments);
}

function _jasmine() {
  _jasmine = _asyncToGenerator(function*(
    globalConfig,
    config,
    environment,
    runtime,
    testPath
  ) {
    const reporter = new _reporter.default(globalConfig, config, testPath);
    const jasmineFactory = runtime.requireInternalModule(JASMINE);
    const jasmine = jasmineFactory.create({
      process,
      testPath,
      testTimeout: globalConfig.testTimeout
    });
    const env = jasmine.getEnv();
    const jasmineInterface = jasmineFactory.interface(jasmine, env);
    Object.assign(environment.global, jasmineInterface);
    env.addReporter(jasmineInterface.jsApiReporter); // TODO: Remove config option if V8 exposes some way of getting location of caller
    // in a future version

    if (config.testLocationInResults === true) {
      const originalIt = environment.global.it;

      environment.global.it = (...args) => {
        const stack = (0, _jestUtil.getCallsite)(1, runtime.getSourceMaps());
        const it = originalIt(...args); // @ts-ignore

        it.result.__callsite = stack;
        return it;
      };

      const originalXit = environment.global.xit;

      environment.global.xit = (...args) => {
        const stack = (0, _jestUtil.getCallsite)(1, runtime.getSourceMaps());
        const xit = originalXit(...args); // @ts-ignore

        xit.result.__callsite = stack;
        return xit;
      };

      const originalFit = environment.global.fit;

      environment.global.fit = (...args) => {
        const stack = (0, _jestUtil.getCallsite)(1, runtime.getSourceMaps());
        const fit = originalFit(...args); // @ts-ignore

        fit.result.__callsite = stack;
        return fit;
      };
    }

    (0, _jasmineAsyncInstall.default)(globalConfig, environment.global);
    (0, _each.default)(environment);
    environment.global.test = environment.global.it;
    environment.global.it.only = environment.global.fit;
    environment.global.it.todo = env.todo;
    environment.global.it.skip = environment.global.xit;
    environment.global.xtest = environment.global.xit;
    environment.global.describe.skip = environment.global.xdescribe;
    environment.global.describe.only = environment.global.fdescribe;

    if (config.timers === 'fake') {
      environment.fakeTimers.useFakeTimers();
    }

    env.beforeEach(() => {
      if (config.resetModules) {
        runtime.resetModules();
      }

      if (config.clearMocks) {
        runtime.clearAllMocks();
      }

      if (config.resetMocks) {
        runtime.resetAllMocks();

        if (config.timers === 'fake') {
          environment.fakeTimers.useFakeTimers();
        }
      }

      if (config.restoreMocks) {
        runtime.restoreAllMocks();
      }
    });
    env.addReporter(reporter);
    runtime
      .requireInternalModule(
        _path.default.resolve(__dirname, './jestExpect.js')
      )
      .default({
        expand: globalConfig.expand
      });

    if (globalConfig.errorOnDeprecated) {
      (0, _errorOnPrivate.installErrorOnPrivate)(environment.global);
    } else {
      Object.defineProperty(jasmine, 'DEFAULT_TIMEOUT_INTERVAL', {
        configurable: true,
        enumerable: true,

        get() {
          return this._DEFAULT_TIMEOUT_INTERVAL;
        },

        set(value) {
          this._DEFAULT_TIMEOUT_INTERVAL = value;
        }
      });
    }

    const snapshotState = runtime
      .requireInternalModule(
        _path.default.resolve(__dirname, './setup_jest_globals.js')
      )
      .default({
        config,
        globalConfig,
        localRequire: runtime.requireModule.bind(runtime),
        testPath
      });
    config.setupFilesAfterEnv.forEach(path => runtime.requireModule(path));

    if (globalConfig.enabledTestsMap) {
      env.specFilter = spec => {
        const suiteMap =
          globalConfig.enabledTestsMap &&
          globalConfig.enabledTestsMap[spec.result.testPath];
        return suiteMap && suiteMap[spec.result.fullName];
      };
    } else if (globalConfig.testNamePattern) {
      const testNameRegex = new RegExp(globalConfig.testNamePattern, 'i');

      env.specFilter = spec => testNameRegex.test(spec.getFullName());
    }

    runtime.requireModule(testPath);
    yield env.execute();
    const results = yield reporter.getResults();
    return addSnapshotData(results, snapshotState);
  });
  return _jasmine.apply(this, arguments);
}

const addSnapshotData = (results, snapshotState) => {
  results.testResults.forEach(({fullName, status}) => {
    if (status === 'pending' || status === 'failed') {
      // if test is skipped or failed, we don't want to mark
      // its snapshots as obsolete.
      snapshotState.markSnapshotsAsCheckedForTest(fullName);
    }
  });
  const uncheckedCount = snapshotState.getUncheckedCount();
  const uncheckedKeys = snapshotState.getUncheckedKeys();

  if (uncheckedCount) {
    snapshotState.removeUncheckedKeys();
  }

  const status = snapshotState.save();
  results.snapshot.fileDeleted = status.deleted;
  results.snapshot.added = snapshotState.added;
  results.snapshot.matched = snapshotState.matched;
  results.snapshot.unmatched = snapshotState.unmatched;
  results.snapshot.updated = snapshotState.updated;
  results.snapshot.unchecked = !status.deleted ? uncheckedCount : 0; // Copy the array to prevent memory leaks

  results.snapshot.uncheckedKeys = Array.from(uncheckedKeys);
  return results;
}; // eslint-disable-next-line no-redeclare

module.exports = jasmine2;
