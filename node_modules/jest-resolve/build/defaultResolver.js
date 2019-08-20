'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = defaultResolver;
exports.clearDefaultResolverCache = void 0;

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

function _browserResolve() {
  const data = _interopRequireDefault(require('browser-resolve'));

  _browserResolve = function _browserResolve() {
    return data;
  };

  return data;
}

function _jestPnpResolver() {
  const data = _interopRequireDefault(require('jest-pnp-resolver'));

  _jestPnpResolver = function _jestPnpResolver() {
    return data;
  };

  return data;
}

var _isBuiltinModule = _interopRequireDefault(require('./isBuiltinModule'));

var _nodeModulesPaths = _interopRequireDefault(require('./nodeModulesPaths'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function defaultResolver(path, options) {
  // @ts-ignore: the "pnp" version named isn't in DefinitelyTyped
  if (process.versions.pnp) {
    return (0, _jestPnpResolver().default)(path, options);
  }

  const resolve = options.browser
    ? _browserResolve().default.sync
    : resolveSync;
  return resolve(path, {
    basedir: options.basedir,
    defaultResolver,
    extensions: options.extensions,
    moduleDirectory: options.moduleDirectory,
    paths: options.paths,
    rootDir: options.rootDir
  });
}

const clearDefaultResolverCache = () => {
  checkedPaths.clear();
};

exports.clearDefaultResolverCache = clearDefaultResolverCache;
const REGEX_RELATIVE_IMPORT = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[\\\/])/;

function resolveSync(target, options) {
  const basedir = options.basedir;
  const extensions = options.extensions || ['.js'];
  const paths = options.paths || [];

  if (REGEX_RELATIVE_IMPORT.test(target)) {
    // resolve relative import
    const resolveTarget = _path().default.resolve(basedir, target);

    const result = tryResolve(resolveTarget);

    if (result) {
      return result;
    }
  } else {
    // otherwise search for node_modules
    const dirs = (0, _nodeModulesPaths.default)(basedir, {
      moduleDirectory: options.moduleDirectory,
      paths
    });

    for (let i = 0; i < dirs.length; i++) {
      const resolveTarget = _path().default.join(dirs[i], target);

      const result = tryResolve(resolveTarget);

      if (result) {
        return result;
      }
    }
  }

  if ((0, _isBuiltinModule.default)(target)) {
    return target;
  }

  const err = new Error(
    "Cannot find module '" + target + "' from '" + basedir + "'"
  );
  err.code = 'MODULE_NOT_FOUND';
  throw err;
  /*
   * contextual helper functions
   */

  function tryResolve(name) {
    const dir = _path().default.dirname(name);

    let result;

    if (isDirectory(dir)) {
      result = resolveAsFile(name) || resolveAsDirectory(name);
    }

    if (result) {
      // Dereference symlinks to ensure we don't create a separate
      // module instance depending on how it was referenced.
      result = _fs().default.realpathSync(result);
    }

    return result;
  }

  function resolveAsFile(name) {
    if (isFile(name)) {
      return name;
    }

    for (let i = 0; i < extensions.length; i++) {
      const file = name + extensions[i];

      if (isFile(file)) {
        return file;
      }
    }

    return undefined;
  }

  function resolveAsDirectory(name) {
    if (!isDirectory(name)) {
      return undefined;
    }

    const pkgfile = _path().default.join(name, 'package.json');

    let pkgmain;

    try {
      const body = _fs().default.readFileSync(pkgfile, 'utf8');

      pkgmain = JSON.parse(body).main;
    } catch (e) {}

    if (pkgmain && !isCurrentDirectory(pkgmain)) {
      const resolveTarget = _path().default.resolve(name, pkgmain);

      const result = tryResolve(resolveTarget);

      if (result) {
        return result;
      }
    }

    return resolveAsFile(_path().default.join(name, 'index'));
  }
}

var IPathType;

(function(IPathType) {
  IPathType[(IPathType['FILE'] = 1)] = 'FILE';
  IPathType[(IPathType['DIRECTORY'] = 2)] = 'DIRECTORY';
  IPathType[(IPathType['OTHER'] = 3)] = 'OTHER';
})(IPathType || (IPathType = {}));

const checkedPaths = new Map();

function statSyncCached(path) {
  const result = checkedPaths.get(path);

  if (result !== undefined) {
    return result;
  }

  let stat;

  try {
    stat = _fs().default.statSync(path);
  } catch (e) {
    if (!(e && (e.code === 'ENOENT' || e.code === 'ENOTDIR'))) {
      throw e;
    }
  }

  if (stat) {
    if (stat.isFile() || stat.isFIFO()) {
      checkedPaths.set(path, IPathType.FILE);
      return IPathType.FILE;
    } else if (stat.isDirectory()) {
      checkedPaths.set(path, IPathType.DIRECTORY);
      return IPathType.DIRECTORY;
    }
  }

  checkedPaths.set(path, IPathType.OTHER);
  return IPathType.OTHER;
}
/*
 * helper functions
 */

function isFile(file) {
  return statSyncCached(file) === IPathType.FILE;
}

function isDirectory(dir) {
  return statSyncCached(dir) === IPathType.DIRECTORY;
}

const CURRENT_DIRECTORY = _path().default.resolve('.');

function isCurrentDirectory(testPath) {
  return CURRENT_DIRECTORY === _path().default.resolve(testPath);
}
