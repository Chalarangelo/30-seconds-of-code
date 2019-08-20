'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _execa() {
  const data = _interopRequireDefault(require('execa'));

  _execa = function _execa() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

const findChangedFilesUsingCommand =
  /*#__PURE__*/
  (function() {
    var _ref = _asyncToGenerator(function*(args, cwd) {
      const result = yield (0, _execa().default)('git', args, {
        cwd
      });
      return result.stdout
        .split('\n')
        .filter(s => s !== '')
        .map(changedPath => _path().default.resolve(cwd, changedPath));
    });

    return function findChangedFilesUsingCommand(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

const adapter = {
  findChangedFiles: (function() {
    var _findChangedFiles = _asyncToGenerator(function*(cwd, options) {
      const changedSince =
        options && (options.withAncestor ? 'HEAD^' : options.changedSince);
      const includePaths = ((options && options.includePaths) || []).map(
        absoluteRoot =>
          _path().default.normalize(_path().default.relative(cwd, absoluteRoot))
      );

      if (options && options.lastCommit) {
        return findChangedFilesUsingCommand(
          ['show', '--name-only', '--pretty=format:', 'HEAD'].concat(
            includePaths
          ),
          cwd
        );
      } else if (changedSince) {
        const committed = yield findChangedFilesUsingCommand(
          [
            'log',
            '--name-only',
            '--pretty=format:',
            'HEAD',
            `^${changedSince}`
          ].concat(includePaths),
          cwd
        );
        const staged = yield findChangedFilesUsingCommand(
          ['diff', '--cached', '--name-only'].concat(includePaths),
          cwd
        );
        const unstaged = yield findChangedFilesUsingCommand(
          ['ls-files', '--other', '--modified', '--exclude-standard'].concat(
            includePaths
          ),
          cwd
        );
        return [...committed, ...staged, ...unstaged];
      } else {
        return findChangedFilesUsingCommand(
          ['ls-files', '--other', '--modified', '--exclude-standard'].concat(
            includePaths
          ),
          cwd
        );
      }
    });

    function findChangedFiles(_x3, _x4) {
      return _findChangedFiles.apply(this, arguments);
    }

    return findChangedFiles;
  })(),
  getRoot: (function() {
    var _getRoot = _asyncToGenerator(function*(cwd) {
      const options = ['rev-parse', '--show-cdup'];

      try {
        const result = yield (0, _execa().default)('git', options, {
          cwd
        });
        return _path().default.resolve(cwd, result.stdout);
      } catch (e) {
        return null;
      }
    });

    function getRoot(_x5) {
      return _getRoot.apply(this, arguments);
    }

    return getRoot;
  })()
};
var _default = adapter;
exports.default = _default;
