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

function _child_process() {
  const data = require('child_process');

  _child_process = function _child_process() {
    return data;
  };

  return data;
}

var _constants = _interopRequireDefault(require('../constants'));

var fastPath = _interopRequireWildcard(require('../lib/fast_path'));

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function find(roots, extensions, ignore, callback) {
  const result = [];
  let activeCalls = 0;

  function search(directory) {
    activeCalls++;

    _fs().default.readdir(directory, (err, names) => {
      activeCalls--;

      if (err) {
        callback(result);
        return;
      }

      names.forEach(file => {
        file = _path().default.join(directory, file);

        if (ignore(file)) {
          return;
        }

        activeCalls++;

        _fs().default.lstat(file, (err, stat) => {
          activeCalls--;

          if (!err && stat && !stat.isSymbolicLink()) {
            if (stat.isDirectory()) {
              search(file);
            } else {
              const ext = _path()
                .default.extname(file)
                .substr(1);

              if (extensions.indexOf(ext) !== -1) {
                result.push([file, stat.mtime.getTime(), stat.size]);
              }
            }
          }

          if (activeCalls === 0) {
            callback(result);
          }
        });
      });

      if (activeCalls === 0) {
        callback(result);
      }
    });
  }

  if (roots.length > 0) {
    roots.forEach(search);
  } else {
    callback(result);
  }
}

function findNative(roots, extensions, ignore, callback) {
  const args = Array.from(roots);
  args.push('-type', 'f');

  if (extensions.length) {
    args.push('(');
  }

  extensions.forEach((ext, index) => {
    if (index) {
      args.push('-o');
    }

    args.push('-iname');
    args.push('*.' + ext);
  });

  if (extensions.length) {
    args.push(')');
  }

  const child = (0, _child_process().spawn)('find', args);
  let stdout = '';

  if (child.stdout === null) {
    throw new Error(
      'stdout is null - this should never happen. Please open up an issue at https://github.com/facebook/jest'
    );
  }

  child.stdout.setEncoding('utf-8');
  child.stdout.on('data', data => (stdout += data));
  child.stdout.on('close', () => {
    const lines = stdout
      .trim()
      .split('\n')
      .filter(x => !ignore(x));
    const result = [];
    let count = lines.length;

    if (!count) {
      callback([]);
    } else {
      lines.forEach(path => {
        _fs().default.stat(path, (err, stat) => {
          if (!err && stat) {
            result.push([path, stat.mtime.getTime(), stat.size]);
          }

          if (--count === 0) {
            callback(result);
          }
        });
      });
    }
  });
}

module.exports = function nodeCrawl(options) {
  const data = options.data,
    extensions = options.extensions,
    forceNodeFilesystemAPI = options.forceNodeFilesystemAPI,
    ignore = options.ignore,
    rootDir = options.rootDir,
    roots = options.roots;
  return new Promise(resolve => {
    const callback = list => {
      const files = new Map();
      const removedFiles = new Map(data.files);
      list.forEach(fileData => {
        const _fileData = _slicedToArray(fileData, 3),
          filePath = _fileData[0],
          mtime = _fileData[1],
          size = _fileData[2];

        const relativeFilePath = fastPath.relative(rootDir, filePath);
        const existingFile = data.files.get(relativeFilePath);

        if (existingFile && existingFile[_constants.default.MTIME] === mtime) {
          files.set(relativeFilePath, existingFile);
        } else {
          // See ../constants.js; SHA-1 will always be null and fulfilled later.
          files.set(relativeFilePath, ['', mtime, size, 0, '', null]);
        }

        removedFiles.delete(relativeFilePath);
      });
      data.files = files;
      resolve({
        hasteMap: data,
        removedFiles
      });
    };

    if (forceNodeFilesystemAPI || process.platform === 'win32') {
      find(roots, extensions, ignore, callback);
    } else {
      findNative(roots, extensions, ignore, callback);
    }
  });
};
