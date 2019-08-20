'use strict';

var matcherUtils = _interopRequireWildcard(require('jest-matcher-utils'));

var _utils = require('./utils');

var _matchers = _interopRequireDefault(require('./matchers'));

var _spyMatchers = _interopRequireDefault(require('./spyMatchers'));

var _toThrowMatchers = _interopRequireWildcard(require('./toThrowMatchers'));

var _jasmineUtils = require('./jasmineUtils');

var _asymmetricMatchers = require('./asymmetricMatchers');

var _jestMatchersObject = require('./jestMatchersObject');

var _extractExpectedAssertionsErrors = _interopRequireDefault(
  require('./extractExpectedAssertionsErrors')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

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

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Promise = global[Symbol.for('jest-native-promise')] || global.Promise;

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

class JestAssertionError extends Error {
  constructor(...args) {
    super(...args);

    _defineProperty(this, 'matcherResult', void 0);
  }
}

const isPromise = obj =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';

const createToThrowErrorMatchingSnapshotMatcher = function createToThrowErrorMatchingSnapshotMatcher(
  matcher
) {
  return function(received, testNameOrInlineSnapshot) {
    return matcher.apply(this, [received, testNameOrInlineSnapshot, true]);
  };
};

const getPromiseMatcher = (name, matcher) => {
  if (name === 'toThrow' || name === 'toThrowError') {
    return (0, _toThrowMatchers.createMatcher)(name, true);
  } else if (
    name === 'toThrowErrorMatchingSnapshot' ||
    name === 'toThrowErrorMatchingInlineSnapshot'
  ) {
    return createToThrowErrorMatchingSnapshotMatcher(matcher);
  }

  return null;
};

const expect = (actual, ...rest) => {
  if (rest.length !== 0) {
    throw new Error('Expect takes at most one argument.');
  }

  const allMatchers = (0, _jestMatchersObject.getMatchers)();
  const expectation = {
    not: {},
    rejects: {
      not: {}
    },
    resolves: {
      not: {}
    }
  };
  const err = new JestAssertionError();
  Object.keys(allMatchers).forEach(name => {
    const matcher = allMatchers[name];
    const promiseMatcher = getPromiseMatcher(name, matcher) || matcher;
    expectation[name] = makeThrowingMatcher(matcher, false, '', actual);
    expectation.not[name] = makeThrowingMatcher(matcher, true, '', actual);
    expectation.resolves[name] = makeResolveMatcher(
      name,
      promiseMatcher,
      false,
      actual,
      err
    );
    expectation.resolves.not[name] = makeResolveMatcher(
      name,
      promiseMatcher,
      true,
      actual,
      err
    );
    expectation.rejects[name] = makeRejectMatcher(
      name,
      promiseMatcher,
      false,
      actual,
      err
    );
    expectation.rejects.not[name] = makeRejectMatcher(
      name,
      promiseMatcher,
      true,
      actual,
      err
    );
  });
  return expectation;
};

const getMessage = message =>
  (message && message()) ||
  matcherUtils.RECEIVED_COLOR('No message was specified for this matcher.');

const makeResolveMatcher = (matcherName, matcher, isNot, actual, outerErr) => (
  ...args
) => {
  const options = {
    isNot,
    promise: 'resolves'
  };

  if (!isPromise(actual)) {
    throw new JestAssertionError(
      matcherUtils.matcherErrorMessage(
        matcherUtils.matcherHint(matcherName, undefined, '', options),
        `${matcherUtils.RECEIVED_COLOR('received')} value must be a promise`,
        matcherUtils.printWithType(
          'Received',
          actual,
          matcherUtils.printReceived
        )
      )
    );
  }

  const innerErr = new JestAssertionError();
  return actual.then(
    result =>
      makeThrowingMatcher(matcher, isNot, 'resolves', result, innerErr).apply(
        null,
        args
      ),
    reason => {
      outerErr.message =
        matcherUtils.matcherHint(matcherName, undefined, '', options) +
        '\n\n' +
        `Received promise rejected instead of resolved\n` +
        `Rejected to value: ${matcherUtils.printReceived(reason)}`;
      return Promise.reject(outerErr);
    }
  );
};

const makeRejectMatcher = (matcherName, matcher, isNot, actual, outerErr) => (
  ...args
) => {
  const options = {
    isNot,
    promise: 'rejects'
  };

  if (!isPromise(actual)) {
    throw new JestAssertionError(
      matcherUtils.matcherErrorMessage(
        matcherUtils.matcherHint(matcherName, undefined, '', options),
        `${matcherUtils.RECEIVED_COLOR('received')} value must be a promise`,
        matcherUtils.printWithType(
          'Received',
          actual,
          matcherUtils.printReceived
        )
      )
    );
  }

  const innerErr = new JestAssertionError();
  return actual.then(
    result => {
      outerErr.message =
        matcherUtils.matcherHint(matcherName, undefined, '', options) +
        '\n\n' +
        `Received promise resolved instead of rejected\n` +
        `Resolved to value: ${matcherUtils.printReceived(result)}`;
      return Promise.reject(outerErr);
    },
    reason =>
      makeThrowingMatcher(matcher, isNot, 'rejects', reason, innerErr).apply(
        null,
        args
      )
  );
};

const makeThrowingMatcher = (matcher, isNot, promise, actual, err) =>
  function throwingMatcher(...args) {
    let throws = true;

    const utils = _objectSpread({}, matcherUtils, {
      iterableEquality: _utils.iterableEquality,
      subsetEquality: _utils.subsetEquality
    });

    const matcherContext = _objectSpread(
      {
        // When throws is disabled, the matcher will not throw errors during test
        // execution but instead add them to the global matcher state. If a
        // matcher throws, test execution is normally stopped immediately. The
        // snapshot matcher uses it because we want to log all snapshot
        // failures in a test.
        dontThrow: () => (throws = false)
      },
      (0, _jestMatchersObject.getState)(),
      {
        equals: _jasmineUtils.equals,
        error: err,
        isNot,
        promise,
        utils
      }
    );

    const processResult = (result, asyncError) => {
      _validateResult(result);

      (0, _jestMatchersObject.getState)().assertionCalls++;

      if ((result.pass && isNot) || (!result.pass && !isNot)) {
        // XOR
        const message = getMessage(result.message);
        let error;

        if (err) {
          error = err;
          error.message = message;
        } else if (asyncError) {
          error = asyncError;
          error.message = message;
        } else {
          error = new JestAssertionError(message); // Try to remove this function from the stack trace frame.
          // Guard for some environments (browsers) that do not support this feature.

          if (Error.captureStackTrace) {
            Error.captureStackTrace(error, throwingMatcher);
          }
        } // Passing the result of the matcher with the error so that a custom
        // reporter could access the actual and expected objects of the result
        // for example in order to display a custom visual diff

        error.matcherResult = result;

        if (throws) {
          throw error;
        } else {
          (0, _jestMatchersObject.getState)().suppressedErrors.push(error);
        }
      }
    };

    const handlError = error => {
      if (
        matcher[_jestMatchersObject.INTERNAL_MATCHER_FLAG] === true &&
        !(error instanceof JestAssertionError) &&
        error.name !== 'PrettyFormatPluginError' && // Guard for some environments (browsers) that do not support this feature.
        Error.captureStackTrace
      ) {
        // Try to remove this and deeper functions from the stack trace frame.
        Error.captureStackTrace(error, throwingMatcher);
      }

      throw error;
    };

    let potentialResult;

    try {
      potentialResult = matcher.call(matcherContext, actual, ...args);

      if (isPromise(potentialResult)) {
        const asyncResult = potentialResult;
        const asyncError = new JestAssertionError();

        if (Error.captureStackTrace) {
          Error.captureStackTrace(asyncError, throwingMatcher);
        }

        return asyncResult
          .then(aResult => processResult(aResult, asyncError))
          .catch(error => handlError(error));
      } else {
        const syncResult = potentialResult;
        return processResult(syncResult);
      }
    } catch (error) {
      return handlError(error);
    }
  };

expect.extend = matchers =>
  (0, _jestMatchersObject.setMatchers)(matchers, false, expect);

expect.anything = _asymmetricMatchers.anything;
expect.any = _asymmetricMatchers.any;
expect.not = {
  arrayContaining: _asymmetricMatchers.arrayNotContaining,
  objectContaining: _asymmetricMatchers.objectNotContaining,
  stringContaining: _asymmetricMatchers.stringNotContaining,
  stringMatching: _asymmetricMatchers.stringNotMatching
};
expect.objectContaining = _asymmetricMatchers.objectContaining;
expect.arrayContaining = _asymmetricMatchers.arrayContaining;
expect.stringContaining = _asymmetricMatchers.stringContaining;
expect.stringMatching = _asymmetricMatchers.stringMatching;

const _validateResult = result => {
  if (
    typeof result !== 'object' ||
    typeof result.pass !== 'boolean' ||
    (result.message &&
      typeof result.message !== 'string' &&
      typeof result.message !== 'function')
  ) {
    throw new Error(
      'Unexpected return from a matcher function.\n' +
        'Matcher functions should ' +
        'return an object in the following format:\n' +
        '  {message?: string | function, pass: boolean}\n' +
        `'${matcherUtils.stringify(result)}' was returned`
    );
  }
};

function assertions(expected) {
  const error = new Error();

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, assertions);
  }

  (0, _jestMatchersObject.getState)().expectedAssertionsNumber = expected;
  (0, _jestMatchersObject.getState)().expectedAssertionsNumberError = error;
}

function hasAssertions(...args) {
  const error = new Error();

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, hasAssertions);
  }

  matcherUtils.ensureNoExpected(args[0], '.hasAssertions');
  (0, _jestMatchersObject.getState)().isExpectingAssertions = true;
  (0, _jestMatchersObject.getState)().isExpectingAssertionsError = error;
} // add default jest matchers

(0, _jestMatchersObject.setMatchers)(_matchers.default, true, expect);
(0, _jestMatchersObject.setMatchers)(_spyMatchers.default, true, expect);
(0, _jestMatchersObject.setMatchers)(_toThrowMatchers.default, true, expect);

expect.addSnapshotSerializer = () => void 0;

expect.assertions = assertions;
expect.hasAssertions = hasAssertions;
expect.getState = _jestMatchersObject.getState;
expect.setState = _jestMatchersObject.setState;
expect.extractExpectedAssertionsErrors =
  _extractExpectedAssertionsErrors.default;
const expectExport = expect; // eslint-disable-next-line no-redeclare

module.exports = expectExport;
