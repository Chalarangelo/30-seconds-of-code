'use strict';

function _exit() {
  const data = _interopRequireDefault(require('exit'));

  _exit = function _exit() {
    return data;
  };

  return data;
}

function _throat() {
  const data = _interopRequireDefault(require('throat'));

  _throat = function _throat() {
    return data;
  };

  return data;
}

function _jestWorker() {
  const data = _interopRequireDefault(require('jest-worker'));

  _jestWorker = function _jestWorker() {
    return data;
  };

  return data;
}

var _runTest = _interopRequireDefault(require('./runTest'));

var _testWorker = require('./testWorker');

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

const TEST_WORKER_PATH = require.resolve('./testWorker');

/* eslint-disable-next-line no-redeclare */
class TestRunner {
  constructor(globalConfig, context) {
    _defineProperty(this, '_globalConfig', void 0);

    _defineProperty(this, '_context', void 0);

    this._globalConfig = globalConfig;
    this._context = context || {};
  }

  runTests(tests, watcher, onStart, onResult, onFailure, options) {
    var _this = this;

    return _asyncToGenerator(function*() {
      return yield options.serial
        ? _this._createInBandTestRun(
            tests,
            watcher,
            onStart,
            onResult,
            onFailure
          )
        : _this._createParallelTestRun(
            tests,
            watcher,
            onStart,
            onResult,
            onFailure
          );
    })();
  }

  _createInBandTestRun(tests, watcher, onStart, onResult, onFailure) {
    var _this2 = this;

    return _asyncToGenerator(function*() {
      process.env.JEST_WORKER_ID = '1';
      const mutex = (0, _throat().default)(1);
      return tests.reduce(
        (promise, test) =>
          mutex(() =>
            promise
              .then(
                /*#__PURE__*/
                _asyncToGenerator(function*() {
                  if (watcher.isInterrupted()) {
                    throw new CancelRun();
                  }

                  yield onStart(test);
                  return (0,
                  _runTest.default)(test.path, _this2._globalConfig, test.context.config, test.context.resolver, _this2._context);
                })
              )
              .then(result => onResult(test, result))
              .catch(err => onFailure(test, err))
          ),
        Promise.resolve()
      );
    })();
  }

  _createParallelTestRun(tests, watcher, onStart, onResult, onFailure) {
    var _this3 = this;

    return _asyncToGenerator(function*() {
      const resolvers = new Map();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = tests[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          const test = _step.value;

          if (!resolvers.has(test.context.config.name)) {
            resolvers.set(test.context.config.name, {
              config: test.context.config,
              serializableModuleMap: test.context.moduleMap.toJSON()
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      const worker = new (_jestWorker()).default(TEST_WORKER_PATH, {
        exposedMethods: ['worker'],
        forkOptions: {
          stdio: 'pipe'
        },
        maxRetries: 3,
        numWorkers: _this3._globalConfig.maxWorkers,
        setupArgs: [
          {
            serializableResolvers: Array.from(resolvers.values())
          }
        ]
      });
      if (worker.getStdout()) worker.getStdout().pipe(process.stdout);
      if (worker.getStderr()) worker.getStderr().pipe(process.stderr);
      const mutex = (0, _throat().default)(_this3._globalConfig.maxWorkers); // Send test suites to workers continuously instead of all at once to track
      // the start time of individual tests.

      const runTestInWorker = test =>
        mutex(
          /*#__PURE__*/
          _asyncToGenerator(function*() {
            if (watcher.isInterrupted()) {
              return Promise.reject();
            }

            yield onStart(test);
            return worker.worker({
              config: test.context.config,
              context: _objectSpread({}, _this3._context, {
                changedFiles:
                  _this3._context.changedFiles &&
                  Array.from(_this3._context.changedFiles)
              }),
              globalConfig: _this3._globalConfig,
              path: test.path
            });
          })
        );

      const onError =
        /*#__PURE__*/
        (function() {
          var _ref3 = _asyncToGenerator(function*(err, test) {
            yield onFailure(test, err);

            if (err.type === 'ProcessTerminatedError') {
              console.error(
                'A worker process has quit unexpectedly! ' +
                  'Most likely this is an initialization error.'
              );
              (0, _exit().default)(1);
            }
          });

          return function onError(_x, _x2) {
            return _ref3.apply(this, arguments);
          };
        })();

      const onInterrupt = new Promise((_, reject) => {
        watcher.on('change', state => {
          if (state.interrupted) {
            reject(new CancelRun());
          }
        });
      });
      const runAllTests = Promise.all(
        tests.map(test =>
          runTestInWorker(test)
            .then(testResult => onResult(test, testResult))
            .catch(error => onError(error, test))
        )
      );

      const cleanup = () => worker.end();

      return Promise.race([runAllTests, onInterrupt]).then(cleanup, cleanup);
    })();
  }
}

class CancelRun extends Error {
  constructor(message) {
    super(message);
    this.name = 'CancelRun';
  }
}

module.exports = TestRunner;
