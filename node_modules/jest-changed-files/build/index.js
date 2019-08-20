'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
Object.defineProperty(exports, 'ChangedFiles', {
  enumerable: true,
  get: function get() {
    return _types.ChangedFiles;
  }
});
Object.defineProperty(exports, 'ChangedFilesPromise', {
  enumerable: true,
  get: function get() {
    return _types.ChangedFilesPromise;
  }
});
exports.findRepos = exports.getChangedFilesForRoots = void 0;

function _throat() {
  const data = _interopRequireDefault(require('throat'));

  _throat = function _throat() {
    return data;
  };

  return data;
}

var _types = require('./types');

var _git = _interopRequireDefault(require('./git'));

var _hg = _interopRequireDefault(require('./hg'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function notEmpty(value) {
  return value != null;
} // This is an arbitrary number. The main goal is to prevent projects with
// many roots (50+) from spawning too many processes at once.

const mutex = (0, _throat().default)(5);

const findGitRoot = dir => mutex(() => _git.default.getRoot(dir));

const findHgRoot = dir => mutex(() => _hg.default.getRoot(dir));

const getChangedFilesForRoots =
  /*#__PURE__*/
  (function() {
    var _ref = _asyncToGenerator(function*(roots, options) {
      const repos = yield findRepos(roots);

      const changedFilesOptions = _objectSpread(
        {
          includePaths: roots
        },
        options
      );

      const gitPromises = Array.from(repos.git).map(repo =>
        _git.default.findChangedFiles(repo, changedFilesOptions)
      );
      const hgPromises = Array.from(repos.hg).map(repo =>
        _hg.default.findChangedFiles(repo, changedFilesOptions)
      );
      const changedFiles = (yield Promise.all(
        gitPromises.concat(hgPromises)
      )).reduce((allFiles, changedFilesInTheRepo) => {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = changedFilesInTheRepo[Symbol.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            const file = _step.value;
            allFiles.add(file);
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

        return allFiles;
      }, new Set());
      return {
        changedFiles,
        repos
      };
    });

    return function getChangedFilesForRoots(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

exports.getChangedFilesForRoots = getChangedFilesForRoots;

const findRepos =
  /*#__PURE__*/
  (function() {
    var _ref2 = _asyncToGenerator(function*(roots) {
      const gitRepos = yield Promise.all(
        roots.reduce((promises, root) => promises.concat(findGitRoot(root)), [])
      );
      const hgRepos = yield Promise.all(
        roots.reduce((promises, root) => promises.concat(findHgRoot(root)), [])
      );
      return {
        git: new Set(gitRepos.filter(notEmpty)),
        hg: new Set(hgRepos.filter(notEmpty))
      };
    });

    return function findRepos(_x3) {
      return _ref2.apply(this, arguments);
    };
  })();

exports.findRepos = findRepos;
