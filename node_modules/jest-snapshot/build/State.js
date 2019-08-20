'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require('fs'));

var _jestMessageUtil = require('jest-message-util');

var _utils = require('./utils');

var _inline_snapshots = require('./inline_snapshots');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

var jestExistsFile =
  global[Symbol.for('jest-native-exists-file')] || _fs.default.existsSync;

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

class SnapshotState {
  // @ts-ignore
  constructor(snapshotPath, options) {
    _defineProperty(this, '_counters', void 0);

    _defineProperty(this, '_dirty', void 0);

    _defineProperty(this, '_index', void 0);

    _defineProperty(this, '_updateSnapshot', void 0);

    _defineProperty(this, '_snapshotData', void 0);

    _defineProperty(this, '_initialData', void 0);

    _defineProperty(this, '_snapshotPath', void 0);

    _defineProperty(this, '_inlineSnapshots', void 0);

    _defineProperty(this, '_uncheckedKeys', void 0);

    _defineProperty(this, '_getBabelTraverse', void 0);

    _defineProperty(this, '_getPrettier', void 0);

    _defineProperty(this, 'added', void 0);

    _defineProperty(this, 'expand', void 0);

    _defineProperty(this, 'matched', void 0);

    _defineProperty(this, 'unmatched', void 0);

    _defineProperty(this, 'updated', void 0);

    this._snapshotPath = snapshotPath;

    const _getSnapshotData = (0, _utils.getSnapshotData)(
        this._snapshotPath,
        options.updateSnapshot
      ),
      data = _getSnapshotData.data,
      dirty = _getSnapshotData.dirty;

    this._initialData = data;
    this._snapshotData = data;
    this._dirty = dirty;
    this._getBabelTraverse = options.getBabelTraverse;
    this._getPrettier = options.getPrettier;
    this._inlineSnapshots = [];
    this._uncheckedKeys = new Set(Object.keys(this._snapshotData));
    this._counters = new Map();
    this._index = 0;
    this.expand = options.expand || false;
    this.added = 0;
    this.matched = 0;
    this.unmatched = 0;
    this._updateSnapshot = options.updateSnapshot;
    this.updated = 0;
  }

  markSnapshotsAsCheckedForTest(testName) {
    this._uncheckedKeys.forEach(uncheckedKey => {
      if ((0, _utils.keyToTestName)(uncheckedKey) === testName) {
        this._uncheckedKeys.delete(uncheckedKey);
      }
    });
  }

  _addSnapshot(key, receivedSerialized, options) {
    this._dirty = true;

    if (options.isInline) {
      const error = options.error || new Error();
      const lines = (0, _jestMessageUtil.getStackTraceLines)(error.stack || '');
      const frame = (0, _jestMessageUtil.getTopFrame)(lines);

      if (!frame) {
        throw new Error(
          "Jest: Couldn't infer stack frame for inline snapshot."
        );
      }

      this._inlineSnapshots.push({
        frame,
        snapshot: receivedSerialized
      });
    } else {
      this._snapshotData[key] = receivedSerialized;
    }
  }

  clear() {
    this._snapshotData = this._initialData;
    this._inlineSnapshots = [];
    this._counters = new Map();
    this._index = 0;
    this.added = 0;
    this.matched = 0;
    this.unmatched = 0;
    this.updated = 0;
  }

  save() {
    const hasExternalSnapshots = Object.keys(this._snapshotData).length;
    const hasInlineSnapshots = this._inlineSnapshots.length;
    const isEmpty = !hasExternalSnapshots && !hasInlineSnapshots;
    const status = {
      deleted: false,
      saved: false
    };

    if ((this._dirty || this._uncheckedKeys.size) && !isEmpty) {
      if (hasExternalSnapshots) {
        (0, _utils.saveSnapshotFile)(this._snapshotData, this._snapshotPath);
      }

      if (hasInlineSnapshots) {
        const prettier = this._getPrettier(); // Load lazily

        const babelTraverse = this._getBabelTraverse(); // Load lazily

        (0, _inline_snapshots.saveInlineSnapshots)(
          this._inlineSnapshots,
          prettier,
          babelTraverse
        );
      }

      status.saved = true;
    } else if (!hasExternalSnapshots && jestExistsFile(this._snapshotPath)) {
      if (this._updateSnapshot === 'all') {
        _fs.default.unlinkSync(this._snapshotPath);
      }

      status.deleted = true;
    }

    return status;
  }

  getUncheckedCount() {
    return this._uncheckedKeys.size || 0;
  }

  getUncheckedKeys() {
    return Array.from(this._uncheckedKeys);
  }

  removeUncheckedKeys() {
    if (this._updateSnapshot === 'all' && this._uncheckedKeys.size) {
      this._dirty = true;

      this._uncheckedKeys.forEach(key => delete this._snapshotData[key]);

      this._uncheckedKeys.clear();
    }
  }

  match({testName, received, key, inlineSnapshot, error}) {
    this._counters.set(testName, (this._counters.get(testName) || 0) + 1);

    const count = Number(this._counters.get(testName));
    const isInline = inlineSnapshot !== undefined;

    if (!key) {
      key = (0, _utils.testNameToKey)(testName, count);
    } // Do not mark the snapshot as "checked" if the snapshot is inline and
    // there's an external snapshot. This way the external snapshot can be
    // removed with `--updateSnapshot`.

    if (!(isInline && this._snapshotData[key])) {
      this._uncheckedKeys.delete(key);
    }

    const receivedSerialized = (0, _utils.serialize)(received);
    const expected = isInline ? inlineSnapshot : this._snapshotData[key];
    const pass = expected === receivedSerialized;
    const hasSnapshot = isInline
      ? inlineSnapshot !== ''
      : this._snapshotData[key] !== undefined;

    const snapshotIsPersisted =
      isInline || _fs.default.existsSync(this._snapshotPath);

    if (pass && !isInline) {
      // Executing a snapshot file as JavaScript and writing the strings back
      // when other snapshots have changed loses the proper escaping for some
      // characters. Since we check every snapshot in every test, use the newly
      // generated formatted string.
      // Note that this is only relevant when a snapshot is added and the dirty
      // flag is set.
      this._snapshotData[key] = receivedSerialized;
    } // These are the conditions on when to write snapshots:
    //  * There's no snapshot file in a non-CI environment.
    //  * There is a snapshot file and we decided to update the snapshot.
    //  * There is a snapshot file, but it doesn't have this snaphsot.
    // These are the conditions on when not to write snapshots:
    //  * The update flag is set to 'none'.
    //  * There's no snapshot file or a file without this snapshot on a CI environment.

    if (
      (hasSnapshot && this._updateSnapshot === 'all') ||
      ((!hasSnapshot || !snapshotIsPersisted) &&
        (this._updateSnapshot === 'new' || this._updateSnapshot === 'all'))
    ) {
      if (this._updateSnapshot === 'all') {
        if (!pass) {
          if (hasSnapshot) {
            this.updated++;
          } else {
            this.added++;
          }

          this._addSnapshot(key, receivedSerialized, {
            error,
            isInline
          });
        } else {
          this.matched++;
        }
      } else {
        this._addSnapshot(key, receivedSerialized, {
          error,
          isInline
        });

        this.added++;
      }

      return {
        actual: '',
        count,
        expected: '',
        key,
        pass: true
      };
    } else {
      if (!pass) {
        this.unmatched++;
        return {
          actual: (0, _utils.unescape)(receivedSerialized),
          count,
          expected: expected ? (0, _utils.unescape)(expected) : null,
          key,
          pass: false
        };
      } else {
        this.matched++;
        return {
          actual: '',
          count,
          expected: '',
          key,
          pass: true
        };
      }
    }
  }

  fail(testName, _received, key) {
    this._counters.set(testName, (this._counters.get(testName) || 0) + 1);

    const count = Number(this._counters.get(testName));

    if (!key) {
      key = (0, _utils.testNameToKey)(testName, count);
    }

    this._uncheckedKeys.delete(key);

    this.unmatched++;
    return key;
  }
}

exports.default = SnapshotState;
