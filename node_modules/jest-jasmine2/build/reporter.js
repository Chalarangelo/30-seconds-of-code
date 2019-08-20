'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _jestMessageUtil = require('jest-message-util');

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var jestNow = global[Symbol.for('jest-native-now')] || global.Date.now;
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

class Jasmine2Reporter {
  constructor(globalConfig, config, testPath) {
    _defineProperty(this, '_testResults', void 0);

    _defineProperty(this, '_globalConfig', void 0);

    _defineProperty(this, '_config', void 0);

    _defineProperty(this, '_currentSuites', void 0);

    _defineProperty(this, '_resolve', void 0);

    _defineProperty(this, '_resultsPromise', void 0);

    _defineProperty(this, '_startTimes', void 0);

    _defineProperty(this, '_testPath', void 0);

    this._globalConfig = globalConfig;
    this._config = config;
    this._testPath = testPath;
    this._testResults = [];
    this._currentSuites = [];
    this._resolve = null;
    this._resultsPromise = new Promise(resolve => (this._resolve = resolve));
    this._startTimes = new Map();
  }

  jasmineStarted(_runDetails) {}

  specStarted(spec) {
    this._startTimes.set(spec.id, jestNow());
  }

  specDone(result) {
    this._testResults.push(
      this._extractSpecResults(result, this._currentSuites.slice(0))
    );
  }

  suiteStarted(suite) {
    this._currentSuites.push(suite.description);
  }

  suiteDone(_result) {
    this._currentSuites.pop();
  }

  jasmineDone(_runDetails) {
    let numFailingTests = 0;
    let numPassingTests = 0;
    let numPendingTests = 0;
    let numTodoTests = 0;
    const testResults = this._testResults;
    testResults.forEach(testResult => {
      if (testResult.status === 'failed') {
        numFailingTests++;
      } else if (testResult.status === 'pending') {
        numPendingTests++;
      } else if (testResult.status === 'todo') {
        numTodoTests++;
      } else {
        numPassingTests++;
      }
    });
    const testResult = {
      console: null,
      failureMessage: (0, _jestMessageUtil.formatResultsErrors)(
        testResults,
        this._config,
        this._globalConfig,
        this._testPath
      ),
      numFailingTests,
      numPassingTests,
      numPendingTests,
      numTodoTests,
      perfStats: {
        end: 0,
        start: 0
      },
      snapshot: {
        added: 0,
        fileDeleted: false,
        matched: 0,
        unchecked: 0,
        unmatched: 0,
        updated: 0
      },
      testFilePath: this._testPath,
      testResults
    };

    this._resolve(testResult);
  }

  getResults() {
    return this._resultsPromise;
  }

  _addMissingMessageToStack(stack, message) {
    // Some errors (e.g. Angular injection error) don't prepend error.message
    // to stack, instead the first line of the stack is just plain 'Error'
    const ERROR_REGEX = /^Error:?\s*\n/;

    if (stack && message && !stack.includes(message)) {
      return message + stack.replace(ERROR_REGEX, '\n');
    }

    return stack;
  }

  _extractSpecResults(specResult, ancestorTitles) {
    const start = this._startTimes.get(specResult.id);

    const duration = start ? jestNow() - start : undefined;
    const status =
      specResult.status === 'disabled' ? 'pending' : specResult.status;
    const location = specResult.__callsite
      ? {
          column: specResult.__callsite.getColumnNumber(),
          line: specResult.__callsite.getLineNumber()
        }
      : null;
    const results = {
      ancestorTitles,
      duration,
      failureMessages: [],
      fullName: specResult.fullName,
      location,
      numPassingAsserts: 0,
      // Jasmine2 only returns an array of failed asserts.
      status,
      title: specResult.description
    };
    specResult.failedExpectations.forEach(failed => {
      const message =
        !failed.matcherName && failed.stack
          ? this._addMissingMessageToStack(failed.stack, failed.message)
          : failed.message || '';
      results.failureMessages.push(message);
    });
    return results;
  }
}

exports.default = Jasmine2Reporter;
