'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = runTest;

function _console() {
  const data = require('@jest/console');

  _console = function _console() {
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

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

function _jestLeakDetector() {
  const data = _interopRequireDefault(require('jest-leak-detector'));

  _jestLeakDetector = function _jestLeakDetector() {
    return data;
  };

  return data;
}

function _jestConfig() {
  const data = require('jest-config');

  _jestConfig = function _jestConfig() {
    return data;
  };

  return data;
}

function docblock() {
  const data = _interopRequireWildcard(require('jest-docblock'));

  docblock = function docblock() {
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

function _sourceMapSupport() {
  const data = _interopRequireDefault(require('source-map-support'));

  _sourceMapSupport = function _sourceMapSupport() {
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

function freezeConsole(testConsole, config) {
  // @ts-ignore: `_log` is `private` - we should figure out some proper API here
  testConsole._log = function fakeConsolePush(_type, message) {
    const error = new (_jestUtil()).ErrorWithStack(
      `${_chalk().default.red(
        `${_chalk().default.bold(
          'Cannot log after tests are done.'
        )} Did you forget to wait for something async in your test?`
      )}\nAttempted to log "${message}".`,
      fakeConsolePush
    );
    const formattedError = (0, _jestMessageUtil().formatExecError)(
      error,
      config,
      {
        noStackTrace: false
      },
      undefined,
      true
    );
    process.stderr.write('\n' + formattedError + '\n'); // TODO: set exit code in Jest 25
    // process.exitCode = 1;
  };
} // Keeping the core of "runTest" as a separate function (as "runTestInternal")
// is key to be able to detect memory leaks. Since all variables are local to
// the function, when "runTestInternal" finishes its execution, they can all be
// freed, UNLESS something else is leaking them (and that's why we can detect
// the leak!).
//
// If we had all the code in a single function, we should manually nullify all
// references to verify if there is a leak, which is not maintainable and error
// prone. That's why "runTestInternal" CANNOT be inlined inside "runTest".

function runTestInternal(_x, _x2, _x3, _x4, _x5) {
  return _runTestInternal.apply(this, arguments);
}

function _runTestInternal() {
  _runTestInternal = _asyncToGenerator(function*(
    path,
    globalConfig,
    config,
    resolver,
    context
  ) {
    const testSource = _gracefulFs().default.readFileSync(path, 'utf8');

    const docblockPragmas = docblock().parse(docblock().extract(testSource));
    const customEnvironment = docblockPragmas['jest-environment'];
    let testEnvironment = config.testEnvironment;

    if (customEnvironment) {
      if (Array.isArray(customEnvironment)) {
        throw new Error(
          `You can only define a single test environment through docblocks, got "${customEnvironment.join(
            ', '
          )}"`
        );
      }

      testEnvironment = (0, _jestConfig().getTestEnvironment)(
        _objectSpread({}, config, {
          testEnvironment: customEnvironment
        })
      );
    }

    const TestEnvironment = (0, _jestUtil().interopRequireDefault)(
      require(testEnvironment)
    ).default;
    const testFramework =
      process.env.JEST_CIRCUS === '1'
        ? require('jest-circus/runner') // eslint-disable-line import/no-extraneous-dependencies
        : require(config.testRunner);
    const Runtime = config.moduleLoader
      ? require(config.moduleLoader)
      : require('jest-runtime');
    let runtime = undefined;
    const consoleOut = globalConfig.useStderr ? process.stderr : process.stdout;

    const consoleFormatter = (type, message) =>
      (0, _console().getConsoleOutput)(
        config.cwd,
        !!globalConfig.verbose, // 4 = the console call is buried 4 stack frames deep
        _console().BufferedConsole.write(
          [],
          type,
          message,
          4,
          runtime && runtime.getSourceMaps()
        )
      );

    let testConsole;

    if (globalConfig.silent) {
      testConsole = new (_console()).NullConsole(
        consoleOut,
        consoleOut,
        consoleFormatter
      );
    } else if (globalConfig.verbose) {
      testConsole = new (_console()).CustomConsole(
        consoleOut,
        consoleOut,
        consoleFormatter
      );
    } else {
      testConsole = new (_console()).BufferedConsole(
        () => runtime && runtime.getSourceMaps()
      );
    }

    const environment = new TestEnvironment(config, {
      console: testConsole,
      docblockPragmas,
      testPath: path
    });
    const leakDetector = config.detectLeaks
      ? new (_jestLeakDetector()).default(environment)
      : null;
    const cacheFS = {
      [path]: testSource
    };
    (0, _jestUtil().setGlobal)(environment.global, 'console', testConsole);
    runtime = new Runtime(config, environment, resolver, cacheFS, {
      changedFiles: context && context.changedFiles,
      collectCoverage: globalConfig.collectCoverage,
      collectCoverageFrom: globalConfig.collectCoverageFrom,
      collectCoverageOnlyFrom: globalConfig.collectCoverageOnlyFrom
    });
    const start = Date.now();
    const sourcemapOptions = {
      environment: 'node',
      handleUncaughtExceptions: false,
      retrieveSourceMap: source => {
        const sourceMaps = runtime && runtime.getSourceMaps();
        const sourceMapSource = sourceMaps && sourceMaps[source];

        if (sourceMapSource) {
          try {
            return {
              map: JSON.parse(
                _gracefulFs().default.readFileSync(sourceMapSource, 'utf8')
              ),
              url: source
            };
          } catch (e) {}
        }

        return null;
      }
    }; // For tests

    runtime
      .requireInternalModule(
        require.resolve('source-map-support'),
        'source-map-support'
      )
      .install(sourcemapOptions); // For runtime errors

    _sourceMapSupport().default.install(sourcemapOptions);

    if (
      environment.global &&
      environment.global.process &&
      environment.global.process.exit
    ) {
      const realExit = environment.global.process.exit;

      environment.global.process.exit = function exit(...args) {
        const error = new (_jestUtil()).ErrorWithStack(
          `process.exit called with "${args.join(', ')}"`,
          exit
        );
        const formattedError = (0, _jestMessageUtil().formatExecError)(
          error,
          config,
          {
            noStackTrace: false
          },
          undefined,
          true
        );
        process.stderr.write(formattedError);
        return realExit(...args);
      };
    }

    try {
      yield environment.setup();
      let result;

      try {
        result = yield testFramework(
          globalConfig,
          config,
          environment,
          runtime,
          path
        );
      } catch (err) {
        // Access stack before uninstalling sourcemaps
        err.stack;
        throw err;
      }

      freezeConsole(testConsole, config);
      const testCount =
        result.numPassingTests +
        result.numFailingTests +
        result.numPendingTests +
        result.numTodoTests;
      result.perfStats = {
        end: Date.now(),
        start
      };
      result.testFilePath = path;
      result.console = testConsole.getBuffer();
      result.skipped = testCount === result.numPendingTests;
      result.displayName = config.displayName;
      const coverage = runtime.getAllCoverageInfoCopy();

      if (coverage) {
        const coverageKeys = Object.keys(coverage);

        if (coverageKeys.length) {
          result.coverage = coverage;
          result.sourceMaps = runtime.getSourceMapInfo(new Set(coverageKeys));
        }
      }

      if (globalConfig.logHeapUsage) {
        if (global.gc) {
          global.gc();
        }

        result.memoryUsage = process.memoryUsage().heapUsed;
      } // Delay the resolution to allow log messages to be output.

      return new Promise(resolve => {
        setImmediate(() =>
          resolve({
            leakDetector,
            result
          })
        );
      });
    } finally {
      yield environment.teardown();

      _sourceMapSupport().default.resetRetrieveHandlers();
    }
  });
  return _runTestInternal.apply(this, arguments);
}

function runTest(_x6, _x7, _x8, _x9, _x10) {
  return _runTest.apply(this, arguments);
}

function _runTest() {
  _runTest = _asyncToGenerator(function*(
    path,
    globalConfig,
    config,
    resolver,
    context
  ) {
    const _ref = yield runTestInternal(
        path,
        globalConfig,
        config,
        resolver,
        context
      ),
      leakDetector = _ref.leakDetector,
      result = _ref.result;

    if (leakDetector) {
      // We wanna allow a tiny but time to pass to allow last-minute cleanup
      yield new Promise(resolve => setTimeout(resolve, 100)); // Resolve leak detector, outside the "runTestInternal" closure.

      result.leaks = leakDetector.isLeaking();
    } else {
      result.leaks = false;
    }

    return result;
  });
  return _runTest.apply(this, arguments);
}
