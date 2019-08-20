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

class UpdateSnapshotsPlugin extends _jestWatcher().BaseWatchPlugin {
  constructor(options) {
    super(options);

    _defineProperty(this, '_hasSnapshotFailure', void 0);

    _defineProperty(this, 'isInternal', void 0);

    this.isInternal = true;
    this._hasSnapshotFailure = false;
  }

  run(_globalConfig, updateConfigAndRun) {
    updateConfigAndRun({
      updateSnapshot: 'all'
    });
    return Promise.resolve(false);
  }

  apply(hooks) {
    hooks.onTestRunComplete(results => {
      this._hasSnapshotFailure = results.snapshot.failure;
    });
  }

  getUsageInfo() {
    if (this._hasSnapshotFailure) {
      return {
        key: 'u',
        prompt: 'update failing snapshots'
      };
    }

    return null;
  }
}

var _default = UpdateSnapshotsPlugin;
exports.default = _default;
