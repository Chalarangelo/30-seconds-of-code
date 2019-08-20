'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = nodeModulesPaths;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _realpathNative() {
  const data = require('realpath-native');

  _realpathNative = function _realpathNative() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Adapted from: https://github.com/substack/node-resolve
 */
function nodeModulesPaths(basedir, options) {
  const modules =
    options && options.moduleDirectory
      ? Array.from(options.moduleDirectory)
      : ['node_modules']; // ensure that `basedir` is an absolute path at this point,
  // resolving against the process' current working directory

  const basedirAbs = _path().default.resolve(basedir);

  let prefix = '/';

  if (/^([A-Za-z]:)/.test(basedirAbs)) {
    prefix = '';
  } else if (/^\\\\/.test(basedirAbs)) {
    prefix = '\\\\';
  } // The node resolution algorithm (as implemented by NodeJS and TypeScript)
  // traverses parents of the physical path, not the symlinked path

  let physicalBasedir;

  try {
    physicalBasedir = (0, _realpathNative().sync)(basedirAbs);
  } catch (err) {
    // realpath can throw, e.g. on mapped drives
    physicalBasedir = basedirAbs;
  }

  const paths = [physicalBasedir];

  let parsed = _path().default.parse(physicalBasedir);

  while (parsed.dir !== paths[paths.length - 1]) {
    paths.push(parsed.dir);
    parsed = _path().default.parse(parsed.dir);
  }

  const dirs = paths
    .reduce(
      (dirs, aPath) =>
        dirs.concat(
          modules.map(moduleDir =>
            _path().default.isAbsolute(moduleDir)
              ? aPath === basedirAbs
                ? moduleDir
                : ''
              : _path().default.join(prefix, aPath, moduleDir)
          )
        ),
      []
    )
    .filter(dir => dir !== '');
  return options.paths ? dirs.concat(options.paths) : dirs;
}
