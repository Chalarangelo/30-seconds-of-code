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
class TestPathPatternPrompt extends _jestWatcher().PatternPrompt {
  constructor(pipe, prompt) {
    super(pipe, prompt);

    _defineProperty(this, '_searchSources', void 0);

    this._entityName = 'filenames';
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
    } catch (e) {}

    let tests = [];

    if (regex && this._searchSources) {
      this._searchSources.forEach(({searchSource}) => {
        tests = tests.concat(searchSource.findMatchingTests(pattern).tests);
      });
    }

    return tests;
  }

  updateSearchSources(searchSources) {
    this._searchSources = searchSources;
  }
}

exports.default = TestPathPatternPrompt;
