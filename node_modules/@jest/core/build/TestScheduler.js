'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _jestMessageUtil() {
  const data = require('jest-message-util');

  _jestMessageUtil = function _jestMessageUtil() {
    return data;
  };

  return data;
}

function _jestSnapshot() {
  const data = _interopRequireDefault(require('jest-snapshot'));

  _jestSnapshot = function _jestSnapshot() {
    return data;
  };

  return data;
}

function _jestRunner() {
  const data = _interopRequireDefault(require('jest-runner'));

  _jestRunner = function _jestRunner() {
    return data;
  };

  return data;
}

function _reporters() {
  const data = require('@jest/reporters');

  _reporters = function _reporters() {
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

function _testResult() {
  const data = require('@jest/test-result');

  _testResult = function _testResult() {
    return data;
  };

  return data;
}

var _ReporterDispatcher = _interopRequireDefault(
  require('./ReporterDispatcher')
);

var _testSchedulerHelper = require('./testSchedulerHelper');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

// The default jest-runner is required because it is the default test runner
// and required implicitly through the `runner` ProjectConfig option.
_jestRunner().default;

class TestScheduler {
  constructor(globalConfig, options, context) {
    _defineProperty(this, '_dispatcher', void 0);

    _defineProperty(this, '_globalConfig', void 0);

    _defineProperty(this, '_options', void 0);

    _defineProperty(this, '_context', void 0);

    this._dispatcher = new _ReporterDispatcher.default();
    this._globalConfig = globalConfig;
    this._options = options;
    this._context = context;

    this._setupReporters();
  }

  addReporter(reporter) {
    this._dispatcher.register(reporter);
  }

  removeReporter(ReporterClass) {
    this._dispatcher.unregister(ReporterClass);
  }

  scheduleTests(tests, watcher) {
    var _this = this;

    return _asyncToGenerator(function*() {
      const onStart = _this._dispatcher.onTestStart.bind(_this._dispatcher);

      const timings = [];
      const contexts = new Set();
      tests.forEach(test => {
        contexts.add(test.context);

        if (test.duration) {
          timings.push(test.duration);
        }
      });
      const aggregatedResults = createAggregatedResults(tests.length);
      const estimatedTime = Math.ceil(
        getEstimatedTime(timings, _this._globalConfig.maxWorkers) / 1000
      );
      const runInBand = (0, _testSchedulerHelper.shouldRunInBand)(
        tests,
        timings,
        _this._globalConfig
      );

      const onResult =
        /*#__PURE__*/
        (function() {
          var _ref = _asyncToGenerator(function*(test, testResult) {
            if (watcher.isInterrupted()) {
              return Promise.resolve();
            }

            if (testResult.testResults.length === 0) {
              const message = 'Your test suite must contain at least one test.';
              return onFailure(test, {
                message,
                stack: new Error(message).stack
              });
            } // Throws when the context is leaked after executing a test.

            if (testResult.leaks) {
              const message =
                _chalk().default.red.bold('EXPERIMENTAL FEATURE!\n') +
                'Your test suite is leaking memory. Please ensure all references are cleaned.\n' +
                '\n' +
                'There is a number of things that can leak memory:\n' +
                '  - Async operations that have not finished (e.g. fs.readFile).\n' +
                '  - Timers not properly mocked (e.g. setInterval, setTimeout).\n' +
                '  - Keeping references to the global scope.';
              return onFailure(test, {
                message,
                stack: new Error(message).stack
              });
            }

            (0, _testResult().addResult)(aggregatedResults, testResult);
            yield _this._dispatcher.onTestResult(
              test,
              testResult,
              aggregatedResults
            );
            return _this._bailIfNeeded(contexts, aggregatedResults, watcher);
          });

          return function onResult(_x, _x2) {
            return _ref.apply(this, arguments);
          };
        })();

      const onFailure =
        /*#__PURE__*/
        (function() {
          var _ref2 = _asyncToGenerator(function*(test, error) {
            if (watcher.isInterrupted()) {
              return;
            }

            const testResult = (0, _testResult().buildFailureTestResult)(
              test.path,
              error
            );
            testResult.failureMessage = (0, _jestMessageUtil().formatExecError)(
              testResult.testExecError,
              test.context.config,
              _this._globalConfig,
              test.path
            );
            (0, _testResult().addResult)(aggregatedResults, testResult);
            yield _this._dispatcher.onTestResult(
              test,
              testResult,
              aggregatedResults
            );
          });

          return function onFailure(_x3, _x4) {
            return _ref2.apply(this, arguments);
          };
        })();

      const updateSnapshotState = () => {
        contexts.forEach(context => {
          const status = _jestSnapshot().default.cleanup(
            context.hasteFS,
            _this._globalConfig.updateSnapshot,
            _jestSnapshot().default.buildSnapshotResolver(context.config),
            context.config.testPathIgnorePatterns
          );

          aggregatedResults.snapshot.filesRemoved += status.filesRemoved;
          aggregatedResults.snapshot.filesRemovedList = (
            aggregatedResults.snapshot.filesRemovedList || []
          ).concat(status.filesRemovedList);
        });
        const updateAll = _this._globalConfig.updateSnapshot === 'all';
        aggregatedResults.snapshot.didUpdate = updateAll;
        aggregatedResults.snapshot.failure = !!(
          !updateAll &&
          (aggregatedResults.snapshot.unchecked ||
            aggregatedResults.snapshot.unmatched ||
            aggregatedResults.snapshot.filesRemoved)
        );
      };

      yield _this._dispatcher.onRunStart(aggregatedResults, {
        estimatedTime,
        showStatus: !runInBand
      });
      const testRunners = Object.create(null);
      contexts.forEach(({config}) => {
        if (!testRunners[config.runner]) {
          const Runner = require(config.runner);

          testRunners[config.runner] = new Runner(_this._globalConfig, {
            changedFiles: _this._context && _this._context.changedFiles
          });
        }
      });

      const testsByRunner = _this._partitionTests(testRunners, tests);

      if (testsByRunner) {
        try {
          var _arr = Object.keys(testRunners);

          for (var _i = 0; _i < _arr.length; _i++) {
            const runner = _arr[_i];
            yield testRunners[runner].runTests(
              testsByRunner[runner],
              watcher,
              onStart,
              onResult,
              onFailure,
              {
                serial: runInBand || Boolean(testRunners[runner].isSerial)
              }
            );
          }
        } catch (error) {
          if (!watcher.isInterrupted()) {
            throw error;
          }
        }
      }

      updateSnapshotState();
      aggregatedResults.wasInterrupted = watcher.isInterrupted();
      yield _this._dispatcher.onRunComplete(contexts, aggregatedResults);
      const anyTestFailures = !(
        aggregatedResults.numFailedTests === 0 &&
        aggregatedResults.numRuntimeErrorTestSuites === 0
      );

      const anyReporterErrors = _this._dispatcher.hasErrors();

      aggregatedResults.success = !(
        anyTestFailures ||
        aggregatedResults.snapshot.failure ||
        anyReporterErrors
      );
      return aggregatedResults;
    })();
  }

  _partitionTests(testRunners, tests) {
    if (Object.keys(testRunners).length > 1) {
      return tests.reduce((testRuns, test) => {
        const runner = test.context.config.runner;

        if (!testRuns[runner]) {
          testRuns[runner] = [];
        }

        testRuns[runner].push(test);
        return testRuns;
      }, Object.create(null));
    } else if (tests.length > 0 && tests[0] != null) {
      // If there is only one runner, don't partition the tests.
      return Object.assign(Object.create(null), {
        [tests[0].context.config.runner]: tests
      });
    } else {
      return null;
    }
  }

  _shouldAddDefaultReporters(reporters) {
    return (
      !reporters ||
      !!reporters.find(
        reporter => this._getReporterProps(reporter).path === 'default'
      )
    );
  }

  _setupReporters() {
    const _this$_globalConfig = this._globalConfig,
      collectCoverage = _this$_globalConfig.collectCoverage,
      notify = _this$_globalConfig.notify,
      reporters = _this$_globalConfig.reporters;

    const isDefault = this._shouldAddDefaultReporters(reporters);

    if (isDefault) {
      this._setupDefaultReporters(collectCoverage);
    }

    if (!isDefault && collectCoverage) {
      this.addReporter(
        new (_reporters()).CoverageReporter(this._globalConfig, {
          changedFiles: this._context && this._context.changedFiles
        })
      );
    }

    if (notify) {
      this.addReporter(
        new (_reporters()).NotifyReporter(
          this._globalConfig,
          this._options.startRun,
          this._context
        )
      );
    }

    if (reporters && Array.isArray(reporters)) {
      this._addCustomReporters(reporters);
    }
  }

  _setupDefaultReporters(collectCoverage) {
    this.addReporter(
      this._globalConfig.verbose
        ? new (_reporters()).VerboseReporter(this._globalConfig)
        : new (_reporters()).DefaultReporter(this._globalConfig)
    );

    if (collectCoverage) {
      this.addReporter(
        new (_reporters()).CoverageReporter(this._globalConfig, {
          changedFiles: this._context && this._context.changedFiles
        })
      );
    }

    this.addReporter(new (_reporters()).SummaryReporter(this._globalConfig));
  }

  _addCustomReporters(reporters) {
    reporters.forEach(reporter => {
      const _this$_getReporterPro = this._getReporterProps(reporter),
        options = _this$_getReporterPro.options,
        path = _this$_getReporterPro.path;

      if (path === 'default') return;

      try {
        const Reporter = require(path);

        this.addReporter(new Reporter(this._globalConfig, options));
      } catch (error) {
        throw new Error(
          'An error occurred while adding the reporter at path "' +
            path +
            '".' +
            error.message
        );
      }
    });
  }
  /**
   * Get properties of a reporter in an object
   * to make dealing with them less painful.
   */

  _getReporterProps(reporter) {
    if (typeof reporter === 'string') {
      return {
        options: this._options,
        path: reporter
      };
    } else if (Array.isArray(reporter)) {
      const _reporter = _slicedToArray(reporter, 2),
        path = _reporter[0],
        options = _reporter[1];

      return {
        options,
        path
      };
    }

    throw new Error('Reporter should be either a string or an array');
  }

  _bailIfNeeded(contexts, aggregatedResults, watcher) {
    if (
      this._globalConfig.bail !== 0 &&
      aggregatedResults.numFailedTests >= this._globalConfig.bail
    ) {
      if (watcher.isWatchMode()) {
        watcher.setState({
          interrupted: true
        });
      } else {
        const failureExit = () => (0, _exit().default)(1);

        return this._dispatcher
          .onRunComplete(contexts, aggregatedResults)
          .then(failureExit)
          .catch(failureExit);
      }
    }

    return Promise.resolve();
  }
}

exports.default = TestScheduler;

const createAggregatedResults = numTotalTestSuites => {
  const result = (0, _testResult().makeEmptyAggregatedTestResult)();
  result.numTotalTestSuites = numTotalTestSuites;
  result.startTime = Date.now();
  result.success = false;
  return result;
};

const getEstimatedTime = (timings, workers) => {
  if (!timings.length) {
    return 0;
  }

  const max = Math.max.apply(null, timings);
  return timings.length <= workers
    ? max
    : Math.max(timings.reduce((sum, time) => sum + time) / workers, max);
};
