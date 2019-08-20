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

var _SnapshotInteractiveMode = _interopRequireDefault(
  require('../SnapshotInteractiveMode')
);

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

class UpdateSnapshotInteractivePlugin extends _jestWatcher().BaseWatchPlugin {
  constructor(...args) {
    super(...args);

    _defineProperty(
      this,
      '_snapshotInteractiveMode',
      new _SnapshotInteractiveMode.default(this._stdout)
    );

    _defineProperty(this, '_failedSnapshotTestAssertions', []);

    _defineProperty(this, 'isInternal', true);
  }

  getFailedSnapshotTestAssertions(testResults) {
    const failedTestPaths = [];

    if (testResults.numFailedTests === 0 || !testResults.testResults) {
      return failedTestPaths;
    }

    testResults.testResults.forEach(testResult => {
      if (testResult.snapshot && testResult.snapshot.unmatched) {
        testResult.testResults.forEach(result => {
          if (result.status === 'failed') {
            failedTestPaths.push({
              fullName: result.fullName,
              path: testResult.testFilePath
            });
          }
        });
      }
    });
    return failedTestPaths;
  }

  apply(hooks) {
    hooks.onTestRunComplete(results => {
      this._failedSnapshotTestAssertions = this.getFailedSnapshotTestAssertions(
        results
      );

      if (this._snapshotInteractiveMode.isActive()) {
        this._snapshotInteractiveMode.updateWithResults(results);
      }
    });
  }

  onKey(key) {
    if (this._snapshotInteractiveMode.isActive()) {
      this._snapshotInteractiveMode.put(key);
    }
  }

  run(_globalConfig, updateConfigAndRun) {
    if (this._failedSnapshotTestAssertions.length) {
      return new Promise(res => {
        this._snapshotInteractiveMode.run(
          this._failedSnapshotTestAssertions,
          (assertion, shouldUpdateSnapshot) => {
            updateConfigAndRun({
              mode: 'watch',
              testNamePattern: assertion ? `^${assertion.fullName}$` : '',
              testPathPattern: assertion ? assertion.path : '',
              updateSnapshot: shouldUpdateSnapshot ? 'all' : 'none'
            });

            if (!this._snapshotInteractiveMode.isActive()) {
              res();
            }
          }
        );
      });
    } else {
      return Promise.resolve();
    }
  }

  getUsageInfo() {
    if (
      this._failedSnapshotTestAssertions &&
      this._failedSnapshotTestAssertions.length > 0
    ) {
      return {
        key: 'i',
        prompt: 'update failing snapshots interactively'
      };
    }

    return null;
  }
}

var _default = UpdateSnapshotInteractivePlugin;
exports.default = _default;
