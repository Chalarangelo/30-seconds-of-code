'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = _default;

var _assert = require('assert');

var _chalk = _interopRequireDefault(require('chalk'));

var _jestMessageUtil = require('jest-message-util');

var _jestUtil = require('jest-util');

var _queueRunner = _interopRequireDefault(require('../queueRunner'));

var _treeProcessor = _interopRequireDefault(require('../treeProcessor'));

var _isError = _interopRequireDefault(require('../isError'));

var _assertionErrorMessage = _interopRequireDefault(
  require('../assertionErrorMessage')
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

function _default(j$) {
  var _temp;

  return (
    (_temp = class Env {
      constructor(_options) {
        _defineProperty(this, 'specFilter', void 0);

        _defineProperty(this, 'catchExceptions', void 0);

        _defineProperty(this, 'throwOnExpectationFailure', void 0);

        _defineProperty(this, 'catchingExceptions', void 0);

        _defineProperty(this, 'topSuite', void 0);

        _defineProperty(this, 'fail', void 0);

        _defineProperty(this, 'pending', void 0);

        _defineProperty(this, 'afterAll', void 0);

        _defineProperty(this, 'fit', void 0);

        _defineProperty(this, 'throwingExpectationFailures', void 0);

        _defineProperty(this, 'randomizeTests', void 0);

        _defineProperty(this, 'randomTests', void 0);

        _defineProperty(this, 'seed', void 0);

        _defineProperty(this, 'execute', void 0);

        _defineProperty(this, 'fdescribe', void 0);

        _defineProperty(this, 'spyOn', void 0);

        _defineProperty(this, 'beforeEach', void 0);

        _defineProperty(this, 'afterEach', void 0);

        _defineProperty(this, 'clearReporters', void 0);

        _defineProperty(this, 'addReporter', void 0);

        _defineProperty(this, 'it', void 0);

        _defineProperty(this, 'xdescribe', void 0);

        _defineProperty(this, 'xit', void 0);

        _defineProperty(this, 'beforeAll', void 0);

        _defineProperty(this, 'todo', void 0);

        _defineProperty(this, 'provideFallbackReporter', void 0);

        _defineProperty(this, 'allowRespy', void 0);

        _defineProperty(this, 'describe', void 0);

        let totalSpecsDefined = 0;
        let catchExceptions = true;
        const realSetTimeout = global.setTimeout;
        const realClearTimeout = global.clearTimeout;
        const runnableResources = {};
        const currentlyExecutingSuites = [];
        let currentSpec = null;
        let throwOnExpectationFailure = false;
        let random = false;
        let seed = null;
        let nextSpecId = 0;
        let nextSuiteId = 0;

        const getNextSpecId = function getNextSpecId() {
          return 'spec' + nextSpecId++;
        };

        const getNextSuiteId = function getNextSuiteId() {
          return 'suite' + nextSuiteId++;
        };

        const topSuite = new j$.Suite({
          id: getNextSuiteId(),
          description: '',

          getTestPath() {
            return j$.testPath;
          }
        });
        let currentDeclarationSuite = topSuite;

        const currentSuite = function currentSuite() {
          return currentlyExecutingSuites[currentlyExecutingSuites.length - 1];
        };

        const currentRunnable = function currentRunnable() {
          return currentSpec || currentSuite();
        };

        const reporter = new j$.ReportDispatcher([
          'jasmineStarted',
          'jasmineDone',
          'suiteStarted',
          'suiteDone',
          'specStarted',
          'specDone'
        ]);

        this.specFilter = function() {
          return true;
        };

        const defaultResourcesForRunnable = function defaultResourcesForRunnable(
          id,
          _parentRunnableId
        ) {
          const resources = {
            spies: []
          };
          runnableResources[id] = resources;
        };

        const clearResourcesForRunnable = function clearResourcesForRunnable(
          id
        ) {
          spyRegistry.clearSpies();
          delete runnableResources[id];
        };

        const beforeAndAfterFns = function beforeAndAfterFns(suite) {
          return function() {
            let afters = [];
            let befores = [];

            while (suite) {
              befores = befores.concat(suite.beforeFns);
              afters = afters.concat(suite.afterFns);
              suite = suite.parentSuite;
            }

            return {
              befores: befores.reverse(),
              afters
            };
          };
        };

        const getSpecName = function getSpecName(spec, suite) {
          const fullName = [spec.description];
          const suiteFullName = suite.getFullName();

          if (suiteFullName !== '') {
            fullName.unshift(suiteFullName);
          }

          return fullName.join(' ');
        };

        this.catchExceptions = function(value) {
          catchExceptions = !!value;
          return catchExceptions;
        };

        this.catchingExceptions = function() {
          return catchExceptions;
        };

        this.throwOnExpectationFailure = function(value) {
          throwOnExpectationFailure = !!value;
        };

        this.throwingExpectationFailures = function() {
          return throwOnExpectationFailure;
        };

        this.randomizeTests = function(value) {
          random = !!value;
        };

        this.randomTests = function() {
          return random;
        };

        this.seed = function(value) {
          if (value) {
            seed = value;
          }

          return seed;
        };

        const queueRunnerFactory = options => {
          options.clearTimeout = realClearTimeout;
          options.fail = this.fail;
          options.setTimeout = realSetTimeout;
          return (0, _queueRunner.default)(options);
        };

        this.topSuite = function() {
          return topSuite;
        };

        const uncaught = err => {
          if (currentSpec) {
            currentSpec.onException(err);
            currentSpec.cancel();
          } else {
            console.error('Unhandled error');
            console.error(err.stack);
          }
        };

        let oldListenersException;
        let oldListenersRejection;

        const executionSetup = function executionSetup() {
          // Need to ensure we are the only ones handling these exceptions.
          oldListenersException = process
            .listeners('uncaughtException')
            .slice();
          oldListenersRejection = process
            .listeners('unhandledRejection')
            .slice();
          j$.process.removeAllListeners('uncaughtException');
          j$.process.removeAllListeners('unhandledRejection');
          j$.process.on('uncaughtException', uncaught);
          j$.process.on('unhandledRejection', uncaught);
        };

        const executionTeardown = function executionTeardown() {
          j$.process.removeListener('uncaughtException', uncaught);
          j$.process.removeListener('unhandledRejection', uncaught); // restore previous exception handlers

          oldListenersException.forEach(listener => {
            j$.process.on('uncaughtException', listener);
          });
          oldListenersRejection.forEach(listener => {
            j$.process.on('unhandledRejection', listener);
          });
        };

        this.execute =
          /*#__PURE__*/
          (function() {
            var _ref = _asyncToGenerator(function*(
              runnablesToRun,
              suiteTree = topSuite
            ) {
              if (!runnablesToRun) {
                if (focusedRunnables.length) {
                  runnablesToRun = focusedRunnables;
                } else {
                  runnablesToRun = [suiteTree.id];
                }
              }

              if (currentlyExecutingSuites.length === 0) {
                executionSetup();
              }

              const lastDeclarationSuite = currentDeclarationSuite;
              yield (0, _treeProcessor.default)({
                nodeComplete(suite) {
                  if (!suite.disabled) {
                    clearResourcesForRunnable(suite.id);
                  }

                  currentlyExecutingSuites.pop();

                  if (suite === topSuite) {
                    reporter.jasmineDone({
                      failedExpectations: topSuite.result.failedExpectations
                    });
                  } else {
                    reporter.suiteDone(suite.getResult());
                  }
                },

                nodeStart(suite) {
                  currentlyExecutingSuites.push(suite);
                  defaultResourcesForRunnable(
                    suite.id,
                    suite.parentSuite && suite.parentSuite.id
                  );

                  if (suite === topSuite) {
                    reporter.jasmineStarted({
                      totalSpecsDefined
                    });
                  } else {
                    reporter.suiteStarted(suite.result);
                  }
                },

                queueRunnerFactory,
                runnableIds: runnablesToRun,
                tree: suiteTree
              });
              currentDeclarationSuite = lastDeclarationSuite;

              if (currentlyExecutingSuites.length === 0) {
                executionTeardown();
              }
            });

            return function(_x) {
              return _ref.apply(this, arguments);
            };
          })();

        this.addReporter = function(reporterToAdd) {
          reporter.addReporter(reporterToAdd);
        };

        this.provideFallbackReporter = function(reporterToAdd) {
          reporter.provideFallbackReporter(reporterToAdd);
        };

        this.clearReporters = function() {
          reporter.clearReporters();
        };

        const spyRegistry = new j$.SpyRegistry({
          currentSpies() {
            if (!currentRunnable()) {
              throw new Error(
                'Spies must be created in a before function or a spec'
              );
            }

            return runnableResources[currentRunnable().id].spies;
          }
        });

        this.allowRespy = function(allow) {
          spyRegistry.allowRespy(allow);
        };

        this.spyOn = function(...args) {
          return spyRegistry.spyOn.apply(spyRegistry, args);
        };

        const suiteFactory = function suiteFactory(description) {
          const suite = new j$.Suite({
            id: getNextSuiteId(),
            description,
            parentSuite: currentDeclarationSuite,
            throwOnExpectationFailure,

            getTestPath() {
              return j$.testPath;
            }
          });
          return suite;
        };

        this.describe = function(description, specDefinitions) {
          const suite = suiteFactory(description);

          if (specDefinitions === undefined) {
            throw new Error(
              `Missing second argument. It must be a callback function.`
            );
          }

          if (typeof specDefinitions !== 'function') {
            throw new Error(
              `Invalid second argument, ${specDefinitions}. It must be a callback function.`
            );
          }

          if (specDefinitions.length > 0) {
            throw new Error('describe does not expect any arguments');
          }

          if (currentDeclarationSuite.markedPending) {
            suite.pend();
          }

          if (currentDeclarationSuite.markedTodo) {
            // @ts-ignore TODO Possible error: Suite does not have todo method
            suite.todo();
          }

          addSpecsToSuite(suite, specDefinitions);
          return suite;
        };

        this.xdescribe = function(description, specDefinitions) {
          const suite = suiteFactory(description);
          suite.pend();
          addSpecsToSuite(suite, specDefinitions);
          return suite;
        };

        const focusedRunnables = [];

        this.fdescribe = function(description, specDefinitions) {
          const suite = suiteFactory(description);
          suite.isFocused = true;
          focusedRunnables.push(suite.id);
          unfocusAncestor();
          addSpecsToSuite(suite, specDefinitions);
          return suite;
        };

        const addSpecsToSuite = (suite, specDefinitions) => {
          const parentSuite = currentDeclarationSuite;
          parentSuite.addChild(suite);
          currentDeclarationSuite = suite;
          let declarationError = undefined;
          let describeReturnValue = undefined;

          try {
            describeReturnValue = specDefinitions.call(suite);
          } catch (e) {
            declarationError = e;
          } // TODO throw in Jest 25: declarationError = new Error

          if ((0, _jestUtil.isPromise)(describeReturnValue)) {
            console.log(
              (0, _jestMessageUtil.formatExecError)(
                new Error(
                  _chalk.default.yellow(
                    'Returning a Promise from "describe" is not supported. Tests must be defined synchronously.\n' +
                      'Returning a value from "describe" will fail the test in a future version of Jest.'
                  )
                ),
                {
                  rootDir: '',
                  testMatch: []
                },
                {
                  noStackTrace: false
                }
              )
            );
          } else if (describeReturnValue !== undefined) {
            console.log(
              (0, _jestMessageUtil.formatExecError)(
                new Error(
                  _chalk.default.yellow(
                    'A "describe" callback must not return a value.\n' +
                      'Returning a value from "describe" will fail the test in a future version of Jest.'
                  )
                ),
                {
                  rootDir: '',
                  testMatch: []
                },
                {
                  noStackTrace: false
                }
              )
            );
          }

          if (declarationError) {
            this.it('encountered a declaration exception', () => {
              throw declarationError;
            });
          }

          currentDeclarationSuite = parentSuite;
        };

        function findFocusedAncestor(suite) {
          while (suite) {
            if (suite.isFocused) {
              return suite.id;
            }

            suite = suite.parentSuite;
          }

          return null;
        }

        function unfocusAncestor() {
          const focusedAncestor = findFocusedAncestor(currentDeclarationSuite);

          if (focusedAncestor) {
            for (let i = 0; i < focusedRunnables.length; i++) {
              if (focusedRunnables[i] === focusedAncestor) {
                focusedRunnables.splice(i, 1);
                break;
              }
            }
          }
        }

        const specFactory = (description, fn, suite, timeout) => {
          totalSpecsDefined++;
          const spec = new j$.Spec({
            id: getNextSpecId(),
            beforeAndAfterFns: beforeAndAfterFns(suite),
            resultCallback: specResultCallback,

            getSpecName(spec) {
              return getSpecName(spec, suite);
            },

            getTestPath() {
              return j$.testPath;
            },

            onStart: specStarted,
            description,
            queueRunnerFactory,

            userContext() {
              return suite.clonedSharedUserContext();
            },

            queueableFn: {
              fn,

              timeout() {
                return timeout || j$._DEFAULT_TIMEOUT_INTERVAL;
              }
            },
            throwOnExpectationFailure
          });

          if (!this.specFilter(spec)) {
            spec.disable();
          }

          return spec;

          function specResultCallback(result) {
            clearResourcesForRunnable(spec.id);
            currentSpec = null;
            reporter.specDone(result);
          }

          function specStarted(spec) {
            currentSpec = spec;
            defaultResourcesForRunnable(spec.id, suite.id);
            reporter.specStarted(spec.result);
          }
        };

        this.it = function(description, fn, timeout) {
          if (typeof description !== 'string') {
            throw new Error(
              `Invalid first argument, ${description}. It must be a string.`
            );
          }

          if (fn === undefined) {
            throw new Error(
              'Missing second argument. It must be a callback function. Perhaps you want to use `test.todo` for a test placeholder.'
            );
          }

          if (typeof fn !== 'function') {
            throw new Error(
              `Invalid second argument, ${fn}. It must be a callback function.`
            );
          }

          const spec = specFactory(
            description,
            fn,
            currentDeclarationSuite,
            timeout
          );

          if (currentDeclarationSuite.markedPending) {
            spec.pend();
          } // When a test is defined inside another, jasmine will not run it.
          // This check throws an error to warn the user about the edge-case.

          if (currentSpec !== null) {
            throw new Error(
              'Tests cannot be nested. Test `' +
                spec.description +
                '` cannot run because it is nested within `' +
                currentSpec.description +
                '`.'
            );
          }

          currentDeclarationSuite.addChild(spec);
          return spec;
        };

        this.xit = function(...args) {
          const spec = this.it.apply(this, args);
          spec.pend('Temporarily disabled with xit');
          return spec;
        };

        this.todo = function() {
          const description = arguments[0];

          if (arguments.length !== 1 || typeof description !== 'string') {
            throw new _jestUtil.ErrorWithStack(
              'Todo must be called with only a description.',
              test.todo
            );
          }

          const spec = specFactory(
            description,
            () => {},
            currentDeclarationSuite
          );
          spec.todo();
          currentDeclarationSuite.addChild(spec);
          return spec;
        };

        this.fit = function(description, fn, timeout) {
          const spec = specFactory(
            description,
            fn,
            currentDeclarationSuite,
            timeout
          );
          currentDeclarationSuite.addChild(spec);
          focusedRunnables.push(spec.id);
          unfocusAncestor();
          return spec;
        };

        this.beforeEach = function(beforeEachFunction, timeout) {
          currentDeclarationSuite.beforeEach({
            fn: beforeEachFunction,

            timeout() {
              return timeout || j$._DEFAULT_TIMEOUT_INTERVAL;
            }
          });
        };

        this.beforeAll = function(beforeAllFunction, timeout) {
          currentDeclarationSuite.beforeAll({
            fn: beforeAllFunction,

            timeout() {
              return timeout || j$._DEFAULT_TIMEOUT_INTERVAL;
            }
          });
        };

        this.afterEach = function(afterEachFunction, timeout) {
          currentDeclarationSuite.afterEach({
            fn: afterEachFunction,

            timeout() {
              return timeout || j$._DEFAULT_TIMEOUT_INTERVAL;
            }
          });
        };

        this.afterAll = function(afterAllFunction, timeout) {
          currentDeclarationSuite.afterAll({
            fn: afterAllFunction,

            timeout() {
              return timeout || j$._DEFAULT_TIMEOUT_INTERVAL;
            }
          });
        };

        this.pending = function(message) {
          let fullMessage = j$.Spec.pendingSpecExceptionMessage;

          if (message) {
            fullMessage += message;
          }

          throw fullMessage;
        };

        this.fail = function(error) {
          let checkIsError;
          let message;

          if (
            error instanceof _assert.AssertionError ||
            (error && error.name === _assert.AssertionError.name)
          ) {
            checkIsError = false; // @ts-ignore TODO Possible error: j$.Spec does not have expand property

            message = (0, _assertionErrorMessage.default)(error, {
              expand: j$.Spec.expand
            });
          } else {
            const check = (0, _isError.default)(error);
            checkIsError = check.isError;
            message = check.message;
          }

          const errorAsErrorObject = checkIsError ? error : new Error(message);
          const runnable = currentRunnable();

          if (!runnable) {
            errorAsErrorObject.message =
              'Caught error after test environment was torn down\n\n' +
              errorAsErrorObject.message;
            throw errorAsErrorObject;
          }

          runnable.addExpectationResult(false, {
            matcherName: '',
            passed: false,
            expected: '',
            actual: '',
            message,
            error: errorAsErrorObject
          });
        };
      }
    }),
    _temp
  );
}
