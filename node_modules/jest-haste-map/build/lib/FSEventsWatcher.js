'use strict';

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _events() {
  const data = require('events');

  _events = function _events() {
    return data;
  };

  return data;
}

function _anymatch() {
  const data = _interopRequireDefault(require('anymatch'));

  _anymatch = function _anymatch() {
    return data;
  };

  return data;
}

function _micromatch() {
  const data = _interopRequireDefault(require('micromatch'));

  _micromatch = function _micromatch() {
    return data;
  };

  return data;
}

function _walker() {
  const data = _interopRequireDefault(require('walker'));

  _walker = function _walker() {
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

let fsevents;

try {
  fsevents = require('fsevents');
} catch (e) {
  // Optional dependency, only supported on Darwin.
}

const CHANGE_EVENT = 'change';
const DELETE_EVENT = 'delete';
const ADD_EVENT = 'add';
const ALL_EVENT = 'all';

/**
 * Export `FSEventsWatcher` class.
 * Watches `dir`.
 */
class FSEventsWatcher extends _events().EventEmitter {
  static isSupported() {
    return fsevents !== undefined;
  }

  static normalizeProxy(callback) {
    return (filepath, stats) =>
      callback(_path().default.normalize(filepath), stats);
  }

  static recReaddir(
    dir,
    dirCallback,
    fileCallback,
    endCallback,
    errorCallback,
    ignored
  ) {
    (0, _walker().default)(dir)
      .filterDir(
        currentDir => !ignored || !(0, _anymatch().default)(ignored, currentDir)
      )
      .on('dir', FSEventsWatcher.normalizeProxy(dirCallback))
      .on('file', FSEventsWatcher.normalizeProxy(fileCallback))
      .on('error', errorCallback)
      .on('end', () => {
        endCallback();
      });
  }

  constructor(dir, opts) {
    if (!fsevents) {
      throw new Error(
        '`fsevents` unavailable (this watcher can only be used on Darwin)'
      );
    }

    super();

    _defineProperty(this, 'root', void 0);

    _defineProperty(this, 'ignored', void 0);

    _defineProperty(this, 'glob', void 0);

    _defineProperty(this, 'dot', void 0);

    _defineProperty(this, 'hasIgnore', void 0);

    _defineProperty(this, 'doIgnore', void 0);

    _defineProperty(this, 'watcher', void 0);

    _defineProperty(this, '_tracked', void 0);

    this.dot = opts.dot || false;
    this.ignored = opts.ignored;
    this.glob = Array.isArray(opts.glob) ? opts.glob : [opts.glob];
    this.hasIgnore =
      Boolean(opts.ignored) && !(Array.isArray(opts) && opts.length > 0);
    this.doIgnore = opts.ignored
      ? (0, _anymatch().default)(opts.ignored)
      : () => false;
    this.root = _path().default.resolve(dir);
    this.watcher = fsevents(this.root);
    this.watcher.start().on('change', this.handleEvent.bind(this));
    this._tracked = new Set();
    FSEventsWatcher.recReaddir(
      this.root,
      filepath => {
        this._tracked.add(filepath);
      },
      filepath => {
        this._tracked.add(filepath);
      },
      this.emit.bind(this, 'ready'),
      this.emit.bind(this, 'error'),
      this.ignored
    );
  }
  /**
   * End watching.
   */

  close(callback) {
    this.watcher.stop();
    this.removeAllListeners();

    if (typeof callback === 'function') {
      process.nextTick(callback.bind(null, null, true));
    }
  }

  isFileIncluded(relativePath) {
    if (this.doIgnore(relativePath)) {
      return false;
    }

    return this.glob.length
      ? _micromatch().default.some(relativePath, this.glob, {
          dot: this.dot
        })
      : this.dot || _micromatch().default.some(relativePath, '**/*');
  }

  handleEvent(filepath) {
    const relativePath = _path().default.relative(this.root, filepath);

    if (!this.isFileIncluded(relativePath)) {
      return;
    }

    _fs().default.lstat(filepath, (error, stat) => {
      if (error && error.code !== 'ENOENT') {
        this.emit('error', error);
        return;
      }

      if (error) {
        // Ignore files that aren't tracked and don't exist.
        if (!this._tracked.has(filepath)) {
          return;
        }

        this._emit(DELETE_EVENT, relativePath);

        this._tracked.delete(filepath);

        return;
      }

      if (this._tracked.has(filepath)) {
        this._emit(CHANGE_EVENT, relativePath, stat);
      } else {
        this._tracked.add(filepath);

        this._emit(ADD_EVENT, relativePath, stat);
      }
    });
  }
  /**
   * Emit events.
   */

  _emit(type, file, stat) {
    this.emit(type, file, this.root, stat);
    this.emit(ALL_EVENT, type, file, this.root, stat);
  }
}

module.exports = FSEventsWatcher;
