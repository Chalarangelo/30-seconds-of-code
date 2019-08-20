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

const env = _objectSpread({}, process.env, {
  HGPLAIN: '1'
});

const adapter = {
  findChangedFiles: (function() {
    var _findChangedFiles = _asyncToGenerator(function*(cwd, options) {
      const includePaths = (options && options.includePaths) || [];
      const args = ['status', '-amnu'];

      if (options && options.withAncestor) {
        args.push('--rev', `min((!public() & ::.)+.)^`);
      } else if (options && options.changedSince) {
        args.push('--rev', `ancestor(., ${options.changedSince})`);
      } else if (options && options.lastCommit === true) {
        args.push('--change', '.');
      }

      args.push(...includePaths);
      const result = yield (0, _execa().default)('hg', args, {
        cwd,
        env
      });
      return result.stdout
        .split('\n')
        .filter(s => s !== '')
        .map(changedPath => _path().default.resolve(cwd, changedPath));
    });

    function findChangedFiles(_x, _x2) {
      return _findChangedFiles.apply(this, arguments);
    }

    return findChangedFiles;
  })(),
  getRoot: (function() {
    var _getRoot = _asyncToGenerator(function*(cwd) {
      try {
        const result = yield (0, _execa().default)('hg', ['root'], {
          cwd,
          env
        });
        return result.stdout;
      } catch (e) {
        return null;
      }
    });

    function getRoot(_x3) {
      return _getRoot.apply(this, arguments);
    }

    return getRoot;
  })()
};
var _default = adapter;
exports.default = _default;
