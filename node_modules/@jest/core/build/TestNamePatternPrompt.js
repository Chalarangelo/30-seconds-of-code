'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _jestWatcher() {
  const data = require('jest-watcher');

  _jestWatcher = function _jestWatcher() {
    return data;
  };

  return data;
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

// TODO: Make underscored props `private`
class TestNamePatternPrompt extends _jestWatcher().PatternPrompt {
  constructor(pipe, prompt) {
    super(pipe, prompt);

    _defineProperty(this, '_cachedTestResults', void 0);

    this._entityName = 'tests';
    this._cachedTestResults = [];
  }

  _onChange(pattern, options) {
    super._onChange(pattern, options);

    this._printPrompt(pattern);
  }

  _printPrompt(pattern) {
    const pipe = this._pipe;
    (0, _jestWatcher().printPatternCaret)(pattern, pipe);
    (0, _jestWatcher().printRestoredPatternCaret)(
      pattern,
      this._currentUsageRows,
      pipe
    );
  }

  _getMatchedTests(pattern) {
    let regex;

    try {
      regex = new RegExp(pattern, 'i');
    } catch (e) {
      return [];
    }

    const matchedTests = [];

    this._cachedTestResults.forEach(({testResults}) =>
      testResults.forEach(({title}) => {
        if (regex.test(title)) {
          matchedTests.push(title);
        }
      })
    );

    return matchedTests;
  }

  updateCachedTestResults(testResults = []) {
    this._cachedTestResults = testResults;
  }
}

exports.default = TestNamePatternPrompt;
