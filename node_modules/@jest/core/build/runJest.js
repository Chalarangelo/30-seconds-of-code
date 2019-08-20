'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _realpathNative() {
  const data = require('realpath-native');

  _realpathNative = function _realpathNative() {
    return data;
  };

  return data;
}

function _console() {
  const data = require('@jest/console');

  _console = function _console() {
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

function _exit() {
  const data = _interopRequireDefault(require('exit'));

  _exit = function _exit() {
    return data;
  };

  return data;
}

function _gracefulFs() {
  const data = _interopRequireDefault(require('graceful-fs'));

  _gracefulFs = function _gracefulFs() {
    return data;
  };

  return data;
}

function _jestWatcher() {
  const data = require('jest-watcher');

  _jestWatcher = function _jestWatcher() {
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

var _getNoTestsFoundMessage = _interopRequireDefault(
  require('./getNoTestsFoundMessage')
);

var _runGlobalHook = _interopRequireDefault(require('./runGlobalHook'));

var _SearchSource = _interopRequireDefault(require('./SearchSource'));

var _TestScheduler = _interopRequireDefault(require('./TestScheduler'));

var _collectHandles = _interopRequireDefault(require('./collectHandles'));

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

const getTestPaths =
  /*#__PURE__*/
  (function() {
    var _ref = _asyncToGenerator(function*(
      globalConfig,
      context,
      outputStream,
      changedFiles,
      jestHooks,
      filter
    ) {
      const source = new _SearchSource.default(context);
      const data = yield source.getTestPaths(
        globalConfig,
        changedFiles,
        filter
      );

      if (!data.tests.length && globalConfig.onlyChanged && data.noSCM) {
        new (_console()).CustomConsole(outputStream, outputStream).log(
          'Jest can only find uncommitted changed files in a git or hg ' +
            'repository. If you make your project a git or hg ' +
            'repository (`git init` or `hg init`), Jest will be able ' +
            'to only run tests related to files changed since the last ' +
            'commit.'
        );
      }

      const shouldTestArray = yield Promise.all(
        data.tests.map(test =>
          jestHooks.shouldRunTestSuite({
            config: test.context.config,
            duration: test.duration,
            testPath: test.path
          })
        )
      );
      const filteredTests = data.tests.filter((_test, i) => shouldTestArray[i]);
      return _objectSpread({}, data, {
        allTests: filteredTests.length,
        tests: filteredTests
      });
    });

    return function getTestPaths(_x, _x2, _x3, _x4, _x5, _x6) {
      return _ref.apply(this, arguments);
    };
  })();

const processResults = (runResults, options) => {
  const outputFile = options.outputFile,
    isJSON = options.json,
    onComplete = options.onComplete,
    outputStream = options.outputStream,
    testResultsProcessor = options.testResultsProcessor,
    collectHandles = options.collectHandles;

  if (collectHandles) {
    runResults.openHandles = collectHandles();
  } else {
    runResults.openHandles = [];
  }

  if (testResultsProcessor) {
    runResults = require(testResultsProcessor)(runResults);
  }

  if (isJSON) {
    if (outputFile) {
      const cwd = (0, _realpathNative().sync)(process.cwd());

      const filePath = _path().default.resolve(cwd, outputFile);

      _gracefulFs().default.writeFileSync(
        filePath,
        JSON.stringify((0, _jestUtil().formatTestResults)(runResults))
      );

      outputStream.write(
        `Test results written to: ${_path().default.relative(cwd, filePath)}\n`
      );
    } else {
      process.stdout.write(
        JSON.stringify((0, _jestUtil().formatTestResults)(runResults))
      );
    }
  }

  return onComplete && onComplete(runResults);
};

const testSchedulerContext = {
  firstRun: true,
  previousSuccess: true
};

var _default =
  /*#__PURE__*/
  (function() {
    var _runJest = _asyncToGenerator(function*({
      contexts,
      globalConfig,
      outputStream,
      testWatcher,
      jestHooks = new (_jestWatcher()).JestHook().getEmitter(),
      startRun,
      changedFilesPromise,
      onComplete,
      failedTestsCache,
      filter
    }) {
      const Sequencer = (0, _jestUtil().interopRequireDefault)(
        require(globalConfig.testSequencer)
      ).default;
      const sequencer = new Sequencer();
      let allTests = [];

      if (changedFilesPromise && globalConfig.watch) {
        const _ref2 = yield changedFilesPromise,
          repos = _ref2.repos;

        const noSCM = Object.keys(repos).every(scm => repos[scm].size === 0);

        if (noSCM) {
          process.stderr.write(
            '\n' +
              _chalk().default.bold('--watch') +
              ' is not supported without git/hg, please use --watchAll ' +
              '\n'
          );
          (0, _exit().default)(1);
        }
      }

      const testRunData = yield Promise.all(
        contexts.map(
          /*#__PURE__*/
          (function() {
            var _ref3 = _asyncToGenerator(function*(context) {
              const matches = yield getTestPaths(
                globalConfig,
                context,
                outputStream,
                changedFilesPromise && (yield changedFilesPromise),
                jestHooks,
                filter
              );
              allTests = allTests.concat(matches.tests);
              return {
                context,
                matches
              };
            });

            return function(_x8) {
              return _ref3.apply(this, arguments);
            };
          })()
        )
      );
      allTests = yield sequencer.sort(allTests);

      if (globalConfig.listTests) {
        const testsPaths = Array.from(new Set(allTests.map(test => test.path)));

        if (globalConfig.json) {
          console.log(JSON.stringify(testsPaths));
        } else {
          console.log(testsPaths.join('\n'));
        }

        onComplete &&
          onComplete((0, _testResult().makeEmptyAggregatedTestResult)());
        return null;
      }

      if (globalConfig.onlyFailures && failedTestsCache) {
        allTests = failedTestsCache.filterTests(allTests);
        globalConfig = failedTestsCache.updateConfig(globalConfig);
      }

      const hasTests = allTests.length > 0;

      if (!hasTests) {
        const noTestsFoundMessage = (0, _getNoTestsFoundMessage.default)(
          testRunData,
          globalConfig
        );

        if (
          globalConfig.passWithNoTests ||
          globalConfig.findRelatedTests ||
          globalConfig.lastCommit ||
          globalConfig.onlyChanged
        ) {
          new (_console()).CustomConsole(outputStream, outputStream).log(
            noTestsFoundMessage
          );
        } else {
          new (_console()).CustomConsole(outputStream, outputStream).error(
            noTestsFoundMessage
          );
          (0, _exit().default)(1);
        }
      } else if (
        allTests.length === 1 &&
        globalConfig.silent !== true &&
        globalConfig.verbose !== false
      ) {
        const newConfig = _objectSpread({}, globalConfig, {
          verbose: true
        });

        globalConfig = Object.freeze(newConfig);
      }

      let collectHandles;

      if (globalConfig.detectOpenHandles) {
        collectHandles = (0, _collectHandles.default)();
      }

      if (hasTests) {
        yield (0, _runGlobalHook.default)({
          allTests,
          globalConfig,
          moduleName: 'globalSetup'
        });
      }

      if (changedFilesPromise) {
        testSchedulerContext.changedFiles = (yield changedFilesPromise).changedFiles;
      }

      const results = yield new _TestScheduler.default(
        globalConfig,
        {
          startRun
        },
        testSchedulerContext
      ).scheduleTests(allTests, testWatcher);
      sequencer.cacheResults(allTests, results);

      if (hasTests) {
        yield (0, _runGlobalHook.default)({
          allTests,
          globalConfig,
          moduleName: 'globalTeardown'
        });
      }

      return processResults(results, {
        collectHandles,
        json: globalConfig.json,
        onComplete,
        outputFile: globalConfig.outputFile,
        outputStream,
        testResultsProcessor: globalConfig.testResultsProcessor
      });
    });

    function runJest(_x7) {
      return _runJest.apply(this, arguments);
    }

    return runJest;
  })();

exports.default = _default;
