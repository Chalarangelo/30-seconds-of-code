'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setMatchers = exports.getMatchers = exports.setState = exports.getState = exports.INTERNAL_MATCHER_FLAG = void 0;

var _asymmetricMatchers = require('./asymmetricMatchers');

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
// Global matchers object holds the list of available matchers and
// the state, that can hold matcher specific values that change over time.
const JEST_MATCHERS_OBJECT = Symbol.for('$$jest-matchers-object'); // Notes a built-in/internal Jest matcher.
// Jest may override the stack trace of Errors thrown by internal matchers.

const INTERNAL_MATCHER_FLAG = Symbol.for('$$jest-internal-matcher');
exports.INTERNAL_MATCHER_FLAG = INTERNAL_MATCHER_FLAG;

if (!global.hasOwnProperty(JEST_MATCHERS_OBJECT)) {
  Object.defineProperty(global, JEST_MATCHERS_OBJECT, {
    value: {
      matchers: Object.create(null),
      state: {
        assertionCalls: 0,
        expectedAssertionsNumber: null,
        isExpectingAssertions: false,
        suppressedErrors: [] // errors that are not thrown immediately.
      }
    }
  });
}

const getState = () => global[JEST_MATCHERS_OBJECT].state;

exports.getState = getState;

const setState = state => {
  Object.assign(global[JEST_MATCHERS_OBJECT].state, state);
};

exports.setState = setState;

const getMatchers = () => global[JEST_MATCHERS_OBJECT].matchers;

exports.getMatchers = getMatchers;

const setMatchers = (matchers, isInternal, expect) => {
  Object.keys(matchers).forEach(key => {
    const matcher = matchers[key];
    Object.defineProperty(matcher, INTERNAL_MATCHER_FLAG, {
      value: isInternal
    });

    if (!isInternal) {
      // expect is defined
      class CustomMatcher extends _asymmetricMatchers.AsymmetricMatcher {
        constructor(inverse = false, ...sample) {
          super(sample);
          this.inverse = inverse;
        }

        asymmetricMatch(other) {
          const _ref = matcher(other, ...this.sample),
            pass = _ref.pass;

          return this.inverse ? !pass : pass;
        }

        toString() {
          return `${this.inverse ? 'not.' : ''}${key}`;
        }

        getExpectedType() {
          return 'any';
        }

        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.join(', ')}>`;
        }
      }

      expect[key] = (...sample) => new CustomMatcher(false, ...sample);

      if (!expect.not) {
        expect.not = {};
      }

      expect.not[key] = (...sample) => new CustomMatcher(true, ...sample);
    }
  });
  Object.assign(global[JEST_MATCHERS_OBJECT].matchers, matchers);
};

exports.setMatchers = setMatchers;
