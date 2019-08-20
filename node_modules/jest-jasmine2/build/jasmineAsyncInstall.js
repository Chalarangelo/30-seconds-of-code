'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = jasmineAsyncInstall;

var _co = _interopRequireDefault(require('co'));

var _isGeneratorFn = _interopRequireDefault(require('is-generator-fn'));

var _throat = _interopRequireDefault(require('throat'));

var _isError3 = _interopRequireDefault(require('./isError'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Promise = global[Symbol.for('jest-native-promise')] || global.Promise;

function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

function promisifyLifeCycleFunction(originalFn, env) {
  return function(fn, timeout) {
    if (!fn) {
      return originalFn.call(env);
    }

    const hasDoneCallback = typeof fn === 'function' && fn.length > 0;

    if (hasDoneCallback) {
      // Jasmine will handle it
      return originalFn.call(env, fn, timeout);
    }

    const extraError = new Error(); // Without this line v8 stores references to all closures
    // in the stack in the Error object. This line stringifies the stack
    // property to allow garbage-collecting objects on the stack
    // https://crbug.com/v8/7142

    extraError.stack = extraError.stack; // We make *all* functions async and run `done` right away if they
    // didn't return a promise.

    const asyncJestLifecycle = function asyncJestLifecycle(done) {
      const wrappedFn = (0, _isGeneratorFn.default)(fn)
        ? _co.default.wrap(fn)
        : fn;
      const returnValue = wrappedFn.call({});

      if (isPromise(returnValue)) {
        returnValue.then(done.bind(null, null), error => {
          const _isError = (0, _isError3.default)(error),
            checkIsError = _isError.isError,
            message = _isError.message;

          if (message) {
            extraError.message = message;
          }

          done.fail(checkIsError ? error : extraError);
        });
      } else {
        done();
      }
    };

    return originalFn.call(env, asyncJestLifecycle, timeout);
  };
} // Similar to promisifyLifeCycleFunction but throws an error
// when the return value is neither a Promise nor `undefined`

function promisifyIt(originalFn, env, jasmine) {
  return function(specName, fn, timeout) {
    if (!fn) {
      const spec = originalFn.call(env, specName);
      spec.pend('not implemented');
      return spec;
    }

    const hasDoneCallback = fn.length > 0;

    if (hasDoneCallback) {
      return originalFn.call(env, specName, fn, timeout);
    }

    const extraError = new Error(); // Without this line v8 stores references to all closures
    // in the stack in the Error object. This line stringifies the stack
    // property to allow garbage-collecting objects on the stack
    // https://crbug.com/v8/7142

    extraError.stack = extraError.stack;

    const asyncJestTest = function asyncJestTest(done) {
      const wrappedFn = (0, _isGeneratorFn.default)(fn)
        ? _co.default.wrap(fn)
        : fn;
      const returnValue = wrappedFn.call({});

      if (isPromise(returnValue)) {
        returnValue.then(done.bind(null, null), error => {
          const _isError2 = (0, _isError3.default)(error),
            checkIsError = _isError2.isError,
            message = _isError2.message;

          if (message) {
            extraError.message = message;
          }

          if (jasmine.Spec.isPendingSpecException(error)) {
            env.pending(message);
            done();
          } else {
            done.fail(checkIsError ? error : extraError);
          }
        });
      } else if (returnValue === undefined) {
        done();
      } else {
        done.fail(
          new Error(
            'Jest: `it` and `test` must return either a Promise or undefined.'
          )
        );
      }
    };

    return originalFn.call(env, specName, asyncJestTest, timeout);
  };
}

function makeConcurrent(originalFn, env, mutex) {
  return function(specName, fn, timeout) {
    if (
      env != null &&
      !env.specFilter({
        getFullName: () => specName || ''
      })
    ) {
      return originalFn.call(env, specName, () => Promise.resolve(), timeout);
    }

    let promise;

    try {
      promise = mutex(() => {
        const promise = fn();

        if (isPromise(promise)) {
          return promise;
        }

        throw new Error(
          `Jest: concurrent test "${specName}" must return a Promise.`
        );
      });
    } catch (error) {
      return originalFn.call(env, specName, () => Promise.reject(error));
    }

    return originalFn.call(env, specName, () => promise, timeout);
  };
}

function jasmineAsyncInstall(globalConfig, global) {
  const jasmine = global.jasmine;
  const mutex = (0, _throat.default)(globalConfig.maxConcurrency);
  const env = jasmine.getEnv();
  env.it = promisifyIt(env.it, env, jasmine);
  env.fit = promisifyIt(env.fit, env, jasmine);

  global.it.concurrent = (env => {
    const concurrent = makeConcurrent(env.it, env, mutex);
    concurrent.only = makeConcurrent(env.fit, env, mutex);
    concurrent.skip = makeConcurrent(env.xit, env, mutex);
    return concurrent;
  })(env);

  global.fit.concurrent = makeConcurrent(env.fit, env, mutex);
  env.afterAll = promisifyLifeCycleFunction(env.afterAll, env);
  env.afterEach = promisifyLifeCycleFunction(env.afterEach, env);
  env.beforeAll = promisifyLifeCycleFunction(env.beforeAll, env);
  env.beforeEach = promisifyLifeCycleFunction(env.beforeEach, env);
}
