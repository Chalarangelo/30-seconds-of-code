'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _micromatch() {
  const data = _interopRequireDefault(require('micromatch'));

  _micromatch = function _micromatch() {
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

var fastPath = _interopRequireWildcard(require('./lib/fast_path'));

var _constants = _interopRequireDefault(require('./constants'));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
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

class HasteFS {
  constructor({rootDir, files}) {
    _defineProperty(this, '_rootDir', void 0);

    _defineProperty(this, '_files', void 0);

    this._rootDir = rootDir;
    this._files = files;
  }

  getModuleName(file) {
    const fileMetadata = this._getFileData(file);

    return (fileMetadata && fileMetadata[_constants.default.ID]) || null;
  }

  getSize(file) {
    const fileMetadata = this._getFileData(file);

    return (fileMetadata && fileMetadata[_constants.default.SIZE]) || null;
  }

  getDependencies(file) {
    const fileMetadata = this._getFileData(file);

    if (fileMetadata) {
      return fileMetadata[_constants.default.DEPENDENCIES]
        ? fileMetadata[_constants.default.DEPENDENCIES].split(
            _constants.default.DEPENDENCY_DELIM
          )
        : [];
    } else {
      return null;
    }
  }

  getSha1(file) {
    const fileMetadata = this._getFileData(file);

    return (fileMetadata && fileMetadata[_constants.default.SHA1]) || null;
  }

  exists(file) {
    return this._getFileData(file) != null;
  }

  getAllFiles() {
    return Array.from(this.getAbsoluteFileIterator());
  }

  getFileIterator() {
    return this._files.keys();
  }

  *getAbsoluteFileIterator() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = this.getFileIterator()[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        const file = _step.value;
        yield fastPath.resolve(this._rootDir, file);
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
  }

  matchFiles(pattern) {
    if (!(pattern instanceof RegExp)) {
      pattern = new RegExp(pattern);
    }

    const files = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
        var _iterator2 = this.getAbsoluteFileIterator()[Symbol.iterator](),
          _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
      ) {
        const file = _step2.value;

        if (pattern.test(file)) {
          files.push(file);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return files;
  }

  matchFilesWithGlob(globs, root) {
    const files = new Set();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (
        var _iterator3 = this.getAbsoluteFileIterator()[Symbol.iterator](),
          _step3;
        !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
        _iteratorNormalCompletion3 = true
      ) {
        const file = _step3.value;
        const filePath = root ? fastPath.relative(root, file) : file;

        if (
          _micromatch().default.some(
            (0, _jestUtil().replacePathSepForGlob)(filePath),
            globs
          )
        ) {
          files.add(file);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return files;
  }

  _getFileData(file) {
    const relativePath = fastPath.relative(this._rootDir, file);
    return this._files.get(relativePath);
  }
}

exports.default = HasteFS;
