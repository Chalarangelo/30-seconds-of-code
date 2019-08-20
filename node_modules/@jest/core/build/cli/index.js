'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.runCLI = void 0;

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

function _jestConfig() {
  const data = require('jest-config');

  _jestConfig = function _jestConfig() {
    return data;
  };

  return data;
}

function _jestRuntime() {
  const data = _interopRequireDefault(require('jest-runtime'));

  _jestRuntime = function _jestRuntime() {
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

function _rimraf() {
  const data = _interopRequireDefault(require('rimraf'));

  _rimraf = function _rimraf() {
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

var _create_context = _interopRequireDefault(require('../lib/create_context'));

var _getChangedFilesPromise = _interopRequireDefault(
  require('../getChangedFilesPromise')
);

var _collectHandles = require('../collectHandles');

var _handle_deprecation_warnings = _interopRequireDefault(
  require('../lib/handle_deprecation_warnings')
);

var _runJest = _interopRequireDefault(require('../runJest'));

var _TestWatcher = _interopRequireDefault(require('../TestWatcher'));

var _watch = _interopRequireDefault(require('../watch'));

var _pluralize = _interopRequireDefault(require('../pluralize'));

var _log_debug_messages = _interopRequireDefault(
  require('../lib/log_debug_messages')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

const preRunMessagePrint = _jestUtil().preRunMessage.print;

const runCLI =
  /*#__PURE__*/
  (function() {
    var _ref = _asyncToGenerator(function*(argv, projects) {
      const realFs = require('fs');

      const fs = require('graceful-fs');

      fs.gracefulify(realFs);
      let results; // If we output a JSON object, we can't write anything to stdout, since
      // it'll break the JSON structure and it won't be valid.

      const outputStream =
        argv.json || argv.useStderr ? process.stderr : process.stdout;

      const _readConfigs = (0, _jestConfig().readConfigs)(argv, projects),
        globalConfig = _readConfigs.globalConfig,
        configs = _readConfigs.configs,
        hasDeprecationWarnings = _readConfigs.hasDeprecationWarnings;

      if (argv.debug) {
        (0, _log_debug_messages.default)(globalConfig, configs, outputStream);
      }

      if (argv.showConfig) {
        (0, _log_debug_messages.default)(globalConfig, configs, process.stdout);
        (0, _exit().default)(0);
      }

      if (argv.clearCache) {
        configs.forEach(config => {
          _rimraf().default.sync(config.cacheDirectory);

          process.stdout.write(`Cleared ${config.cacheDirectory}\n`);
        });
        (0, _exit().default)(0);
      }

      yield _run(
        globalConfig,
        configs,
        hasDeprecationWarnings,
        outputStream,
        r => (results = r)
      );

      if (argv.watch || argv.watchAll) {
        // If in watch mode, return the promise that will never resolve.
        // If the watch mode is interrupted, watch should handle the process
        // shutdown.
        return new Promise(() => {});
      }

      if (!results) {
        throw new Error(
          'AggregatedResult must be present after test run is complete'
        );
      }

      const _results = results,
        openHandles = _results.openHandles;

      if (openHandles && openHandles.length) {
        const formatted = (0, _collectHandles.formatHandleErrors)(
          openHandles,
          configs[0]
        );
        const openHandlesString = (0, _pluralize.default)(
          'open handle',
          formatted.length,
          's'
        );
        const message =
          _chalk().default.red(
            `\nJest has detected the following ${openHandlesString} potentially keeping Jest from exiting:\n\n`
          ) + formatted.join('\n\n');
        console.error(message);
      }

      return {
        globalConfig,
        results
      };
    });

    return function runCLI(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

exports.runCLI = runCLI;

const buildContextsAndHasteMaps =
  /*#__PURE__*/
  (function() {
    var _ref2 = _asyncToGenerator(function*(
      configs,
      globalConfig,
      outputStream
    ) {
      const hasteMapInstances = Array(configs.length);
      const contexts = yield Promise.all(
        configs.map(
          /*#__PURE__*/
          (function() {
            var _ref3 = _asyncToGenerator(function*(config, index) {
              (0, _jestUtil().createDirectory)(config.cacheDirectory);

              const hasteMapInstance = _jestRuntime().default.createHasteMap(
                config,
                {
                  console: new (_console()).CustomConsole(
                    outputStream,
                    outputStream
                  ),
                  maxWorkers: globalConfig.maxWorkers,
                  resetCache: !config.cache,
                  watch: globalConfig.watch || globalConfig.watchAll,
                  watchman: globalConfig.watchman
                }
              );

              hasteMapInstances[index] = hasteMapInstance;
              return (0,
              _create_context.default)(config, yield hasteMapInstance.build());
            });

            return function(_x6, _x7) {
              return _ref3.apply(this, arguments);
            };
          })()
        )
      );
      return {
        contexts,
        hasteMapInstances
      };
    });

    return function buildContextsAndHasteMaps(_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  })();

const _run =
  /*#__PURE__*/
  (function() {
    var _ref4 = _asyncToGenerator(function*(
      globalConfig,
      configs,
      hasDeprecationWarnings,
      outputStream,
      onComplete
    ) {
      // Queries to hg/git can take a while, so we need to start the process
      // as soon as possible, so by the time we need the result it's already there.
      const changedFilesPromise = (0, _getChangedFilesPromise.default)(
        globalConfig,
        configs
      ); // Filter may need to do an HTTP call or something similar to setup.
      // We will wait on an async response from this before using the filter.

      let filter;

      if (globalConfig.filter && !globalConfig.skipFilter) {
        const rawFilter = require(globalConfig.filter);

        let filterSetupPromise;

        if (rawFilter.setup) {
          // Wrap filter setup Promise to avoid "uncaught Promise" error.
          // If an error is returned, we surface it in the return value.
          filterSetupPromise = _asyncToGenerator(function*() {
            try {
              yield rawFilter.setup();
            } catch (err) {
              return err;
            }

            return undefined;
          })();
        }

        filter =
          /*#__PURE__*/
          (function() {
            var _ref6 = _asyncToGenerator(function*(testPaths) {
              if (filterSetupPromise) {
                // Expect an undefined return value unless there was an error.
                const err = yield filterSetupPromise;

                if (err) {
                  throw err;
                }
              }

              return rawFilter(testPaths);
            });

            return function filter(_x13) {
              return _ref6.apply(this, arguments);
            };
          })();
      }

      const _ref7 = yield buildContextsAndHasteMaps(
          configs,
          globalConfig,
          outputStream
        ),
        contexts = _ref7.contexts,
        hasteMapInstances = _ref7.hasteMapInstances;

      globalConfig.watch || globalConfig.watchAll
        ? yield runWatch(
            contexts,
            configs,
            hasDeprecationWarnings,
            globalConfig,
            outputStream,
            hasteMapInstances,
            filter
          )
        : yield runWithoutWatch(
            globalConfig,
            contexts,
            outputStream,
            onComplete,
            changedFilesPromise,
            filter
          );
    });

    return function _run(_x8, _x9, _x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  })();

const runWatch =
  /*#__PURE__*/
  (function() {
    var _ref8 = _asyncToGenerator(function*(
      contexts,
      _configs,
      hasDeprecationWarnings,
      globalConfig,
      outputStream,
      hasteMapInstances,
      filter
    ) {
      if (hasDeprecationWarnings) {
        try {
          yield (0, _handle_deprecation_warnings.default)(
            outputStream,
            process.stdin
          );
          return (0, _watch.default)(
            globalConfig,
            contexts,
            outputStream,
            hasteMapInstances,
            undefined,
            undefined,
            filter
          );
        } catch (e) {
          (0, _exit().default)(0);
        }
      }

      return (0, _watch.default)(
        globalConfig,
        contexts,
        outputStream,
        hasteMapInstances,
        undefined,
        undefined,
        filter
      );
    });

    return function runWatch(_x14, _x15, _x16, _x17, _x18, _x19, _x20) {
      return _ref8.apply(this, arguments);
    };
  })();

const runWithoutWatch =
  /*#__PURE__*/
  (function() {
    var _ref9 = _asyncToGenerator(function*(
      globalConfig,
      contexts,
      outputStream,
      onComplete,
      changedFilesPromise,
      filter
    ) {
      const startRun =
        /*#__PURE__*/
        (function() {
          var _ref10 = _asyncToGenerator(function*() {
            if (!globalConfig.listTests) {
              preRunMessagePrint(outputStream);
            }

            return (0, _runJest.default)({
              changedFilesPromise,
              contexts,
              failedTestsCache: undefined,
              filter,
              globalConfig,
              onComplete,
              outputStream,
              startRun,
              testWatcher: new _TestWatcher.default({
                isWatchMode: false
              })
            });
          });

          return function startRun() {
            return _ref10.apply(this, arguments);
          };
        })();

      return startRun();
    });

    return function runWithoutWatch(_x21, _x22, _x23, _x24, _x25, _x26) {
      return _ref9.apply(this, arguments);
    };
  })();
