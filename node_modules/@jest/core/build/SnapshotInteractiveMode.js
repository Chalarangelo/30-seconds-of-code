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

function _ansiEscapes() {
  const data = _interopRequireDefault(require('ansi-escapes'));

  _ansiEscapes = function _ansiEscapes() {
    return data;
  };

  return data;
}

function _jestWatcher() {
  const data = require('jest-watcher');

  _jestWatcher = function _jestWatcher() {
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

const ARROW = _jestUtil().specialChars.ARROW,
  CLEAR = _jestUtil().specialChars.CLEAR;

class SnapshotInteractiveMode {
  constructor(pipe) {
    _defineProperty(this, '_pipe', void 0);

    _defineProperty(this, '_isActive', void 0);

    _defineProperty(this, '_updateTestRunnerConfig', void 0);

    _defineProperty(this, '_testAssertions', void 0);

    _defineProperty(this, '_countPaths', void 0);

    _defineProperty(this, '_skippedNum', void 0);

    this._pipe = pipe;
    this._isActive = false;
    this._skippedNum = 0;
  }

  isActive() {
    return this._isActive;
  }

  getSkippedNum() {
    return this._skippedNum;
  }

  _clearTestSummary() {
    this._pipe.write(_ansiEscapes().default.cursorUp(6));

    this._pipe.write(_ansiEscapes().default.eraseDown);
  }

  _drawUIProgress() {
    this._clearTestSummary();

    const numPass = this._countPaths - this._testAssertions.length;
    const numRemaining = this._countPaths - numPass - this._skippedNum;

    let stats = _chalk().default.bold.dim(
      (0, _jestUtil().pluralize)('snapshot', numRemaining) + ' remaining'
    );

    if (numPass) {
      stats +=
        ', ' +
        _chalk().default.bold.green(
          (0, _jestUtil().pluralize)('snapshot', numPass) + ' updated'
        );
    }

    if (this._skippedNum) {
      stats +=
        ', ' +
        _chalk().default.bold.yellow(
          (0, _jestUtil().pluralize)('snapshot', this._skippedNum) + ' skipped'
        );
    }

    const messages = [
      '\n' + _chalk().default.bold('Interactive Snapshot Progress'),
      ARROW + stats,
      '\n' + _chalk().default.bold('Watch Usage'),
      _chalk().default.dim(ARROW + 'Press ') +
        'u' +
        _chalk().default.dim(' to update failing snapshots for this test.'),
      _chalk().default.dim(ARROW + 'Press ') +
        's' +
        _chalk().default.dim(' to skip the current test.'),
      _chalk().default.dim(ARROW + 'Press ') +
        'q' +
        _chalk().default.dim(' to quit Interactive Snapshot Mode.'),
      _chalk().default.dim(ARROW + 'Press ') +
        'Enter' +
        _chalk().default.dim(' to trigger a test run.')
    ];

    this._pipe.write(messages.filter(Boolean).join('\n') + '\n');
  }

  _drawUIDoneWithSkipped() {
    this._pipe.write(CLEAR);

    const numPass = this._countPaths - this._testAssertions.length;

    let stats = _chalk().default.bold.dim(
      (0, _jestUtil().pluralize)('snapshot', this._countPaths) + ' reviewed'
    );

    if (numPass) {
      stats +=
        ', ' +
        _chalk().default.bold.green(
          (0, _jestUtil().pluralize)('snapshot', numPass) + ' updated'
        );
    }

    if (this._skippedNum) {
      stats +=
        ', ' +
        _chalk().default.bold.yellow(
          (0, _jestUtil().pluralize)('snapshot', this._skippedNum) + ' skipped'
        );
    }

    const messages = [
      '\n' + _chalk().default.bold('Interactive Snapshot Result'),
      ARROW + stats,
      '\n' + _chalk().default.bold('Watch Usage'),
      _chalk().default.dim(ARROW + 'Press ') +
        'r' +
        _chalk().default.dim(' to restart Interactive Snapshot Mode.'),
      _chalk().default.dim(ARROW + 'Press ') +
        'q' +
        _chalk().default.dim(' to quit Interactive Snapshot Mode.')
    ];

    this._pipe.write(messages.filter(Boolean).join('\n') + '\n');
  }

  _drawUIDone() {
    this._pipe.write(CLEAR);

    const numPass = this._countPaths - this._testAssertions.length;

    let stats = _chalk().default.bold.dim(
      (0, _jestUtil().pluralize)('snapshot', this._countPaths) + ' reviewed'
    );

    if (numPass) {
      stats +=
        ', ' +
        _chalk().default.bold.green(
          (0, _jestUtil().pluralize)('snapshot', numPass) + ' updated'
        );
    }

    const messages = [
      '\n' + _chalk().default.bold('Interactive Snapshot Result'),
      ARROW + stats,
      '\n' + _chalk().default.bold('Watch Usage'),
      _chalk().default.dim(ARROW + 'Press ') +
        'Enter' +
        _chalk().default.dim(' to return to watch mode.')
    ];

    this._pipe.write(messages.filter(Boolean).join('\n') + '\n');
  }

  _drawUIOverlay() {
    if (this._testAssertions.length === 0) {
      return this._drawUIDone();
    }

    if (this._testAssertions.length - this._skippedNum === 0) {
      return this._drawUIDoneWithSkipped();
    }

    return this._drawUIProgress();
  }

  put(key) {
    switch (key) {
      case 's':
        if (this._skippedNum === this._testAssertions.length) break;
        this._skippedNum += 1; // move skipped test to the end

        this._testAssertions.push(this._testAssertions.shift());

        if (this._testAssertions.length - this._skippedNum > 0) {
          this._run(false);
        } else {
          this._drawUIDoneWithSkipped();
        }

        break;

      case 'u':
        this._run(true);

        break;

      case 'q':
      case _jestWatcher().KEYS.ESCAPE:
        this.abort();
        break;

      case 'r':
        this.restart();
        break;

      case _jestWatcher().KEYS.ENTER:
        if (this._testAssertions.length === 0) {
          this.abort();
        } else {
          this._run(false);
        }

        break;

      default:
        break;
    }
  }

  abort() {
    this._isActive = false;
    this._skippedNum = 0;

    this._updateTestRunnerConfig(null, false);
  }

  restart() {
    this._skippedNum = 0;
    this._countPaths = this._testAssertions.length;

    this._run(false);
  }

  updateWithResults(results) {
    const hasSnapshotFailure = !!results.snapshot.failure;

    if (hasSnapshotFailure) {
      this._drawUIOverlay();

      return;
    }

    this._testAssertions.shift();

    if (this._testAssertions.length - this._skippedNum === 0) {
      this._drawUIOverlay();

      return;
    } // Go to the next test

    this._run(false);
  }

  _run(shouldUpdateSnapshot) {
    const testAssertion = this._testAssertions[0];

    this._updateTestRunnerConfig(testAssertion, shouldUpdateSnapshot);
  }

  run(failedSnapshotTestAssertions, onConfigChange) {
    if (!failedSnapshotTestAssertions.length) {
      return;
    }

    this._testAssertions = [...failedSnapshotTestAssertions];
    this._countPaths = this._testAssertions.length;
    this._updateTestRunnerConfig = onConfigChange;
    this._isActive = true;

    this._run(false);
  }
}

exports.default = SnapshotInteractiveMode;
