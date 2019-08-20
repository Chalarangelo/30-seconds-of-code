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

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

var _default_reporter = _interopRequireDefault(require('./default_reporter'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

const ICONS = _jestUtil().specialChars.ICONS;

class VerboseReporter extends _default_reporter.default {
  constructor(globalConfig) {
    super(globalConfig);

    _defineProperty(this, '_globalConfig', void 0);

    this._globalConfig = globalConfig;
  }

  static filterTestResults(testResults) {
    return testResults.filter(({status}) => status !== 'pending');
  }

  static groupTestsBySuites(testResults) {
    const root = {
      suites: [],
      tests: [],
      title: ''
    };
    testResults.forEach(testResult => {
      let targetSuite = root; // Find the target suite for this test,
      // creating nested suites as necessary.

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
          var _iterator = testResult.ancestorTitles[Symbol.iterator](), _step;
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          _iteratorNormalCompletion = true
        ) {
          const title = _step.value;
          let matchingSuite = targetSuite.suites.find(s => s.title === title);

          if (!matchingSuite) {
            matchingSuite = {
              suites: [],
              tests: [],
              title
            };
            targetSuite.suites.push(matchingSuite);
          }

          targetSuite = matchingSuite;
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

      targetSuite.tests.push(testResult);
    });
    return root;
  }

  onTestResult(test, result, aggregatedResults) {
    super.testFinished(test.context.config, result, aggregatedResults);

    if (!result.skipped) {
      this.printTestFileHeader(
        result.testFilePath,
        test.context.config,
        result
      );

      if (!result.testExecError && !result.skipped) {
        this._logTestResults(result.testResults);
      }

      this.printTestFileFailureMessage(
        result.testFilePath,
        test.context.config,
        result
      );
    }

    super.forceFlushBufferedOutput();
  }

  _logTestResults(testResults) {
    this._logSuite(VerboseReporter.groupTestsBySuites(testResults), 0);

    this._logLine();
  }

  _logSuite(suite, indentLevel) {
    if (suite.title) {
      this._logLine(suite.title, indentLevel);
    }

    this._logTests(suite.tests, indentLevel + 1);

    suite.suites.forEach(suite => this._logSuite(suite, indentLevel + 1));
  }

  _getIcon(status) {
    if (status === 'failed') {
      return _chalk().default.red(ICONS.failed);
    } else if (status === 'pending') {
      return _chalk().default.yellow(ICONS.pending);
    } else if (status === 'todo') {
      return _chalk().default.magenta(ICONS.todo);
    } else {
      return _chalk().default.green(ICONS.success);
    }
  }

  _logTest(test, indentLevel) {
    const status = this._getIcon(test.status);

    const time = test.duration ? ` (${test.duration.toFixed(0)}ms)` : '';

    this._logLine(
      status + ' ' + _chalk().default.dim(test.title + time),
      indentLevel
    );
  }

  _logTests(tests, indentLevel) {
    if (this._globalConfig.expand) {
      tests.forEach(test => this._logTest(test, indentLevel));
    } else {
      const summedTests = tests.reduce(
        (result, test) => {
          if (test.status === 'pending') {
            result.pending.push(test);
          } else if (test.status === 'todo') {
            result.todo.push(test);
          } else {
            this._logTest(test, indentLevel);
          }

          return result;
        },
        {
          pending: [],
          todo: []
        }
      );

      if (summedTests.pending.length > 0) {
        summedTests.pending.forEach(this._logTodoOrPendingTest(indentLevel));
      }

      if (summedTests.todo.length > 0) {
        summedTests.todo.forEach(this._logTodoOrPendingTest(indentLevel));
      }
    }
  }

  _logTodoOrPendingTest(indentLevel) {
    return test => {
      const printedTestStatus =
        test.status === 'pending' ? 'skipped' : test.status;

      const icon = this._getIcon(test.status);

      const text = _chalk().default.dim(`${printedTestStatus} ${test.title}`);

      this._logLine(`${icon} ${text}`, indentLevel);
    };
  }

  _logLine(str, indentLevel) {
    const indentation = '  '.repeat(indentLevel || 0);
    this.log(indentation + (str || ''));
  }
}

exports.default = VerboseReporter;
