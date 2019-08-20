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

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
    return data;
  };

  return data;
}

var _constants = require('./constants');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const isFile = filePath =>
  _fs().default.existsSync(filePath) &&
  !_fs()
    .default.lstatSync(filePath)
    .isDirectory();

var _default = (pathToResolve, cwd) => {
  if (!_path().default.isAbsolute(cwd)) {
    throw new Error(`"cwd" must be an absolute path. cwd: ${cwd}`);
  }

  const absolutePath = _path().default.isAbsolute(pathToResolve)
    ? pathToResolve
    : _path().default.resolve(cwd, pathToResolve);

  if (isFile(absolutePath)) {
    return absolutePath;
  } // This is a guard against passing non existing path as a project/config,
  // that will otherwise result in a very confusing situation.
  // e.g.
  // With a directory structure like this:
  //   my_project/
  //     packcage.json
  //
  // Passing a `my_project/some_directory_that_doesnt_exist` as a project
  // name will resolve into a (possibly empty) `my_project/package.json` and
  // try to run all tests it finds under `my_project` directory.

  if (!_fs().default.existsSync(absolutePath)) {
    throw new Error(
      `Can't find a root directory while resolving a config file path.\n` +
        `Provided path to resolve: ${pathToResolve}\n` +
        `cwd: ${cwd}`
    );
  }

  return resolveConfigPathByTraversing(absolutePath, pathToResolve, cwd);
};

exports.default = _default;

const resolveConfigPathByTraversing = (pathToResolve, initialPath, cwd) => {
  const jestConfig = _path().default.resolve(
    pathToResolve,
    _constants.JEST_CONFIG
  );

  if (isFile(jestConfig)) {
    return jestConfig;
  }

  const packageJson = _path().default.resolve(
    pathToResolve,
    _constants.PACKAGE_JSON
  );

  if (isFile(packageJson)) {
    return packageJson;
  } // This is the system root.
  // We tried everything, config is nowhere to be found ¯\_(ツ)_/¯

  if (pathToResolve === _path().default.dirname(pathToResolve)) {
    throw new Error(makeResolutionErrorMessage(initialPath, cwd));
  } // go up a level and try it again

  return resolveConfigPathByTraversing(
    _path().default.dirname(pathToResolve),
    initialPath,
    cwd
  );
};

const makeResolutionErrorMessage = (initialPath, cwd) =>
  'Could not find a config file based on provided values:\n' +
  `path: "${initialPath}"\n` +
  `cwd: "${cwd}"\n` +
  'Config paths must be specified by either a direct path to a config\n' +
  'file, or a path to a directory. If directory is given, Jest will try to\n' +
  `traverse directory tree up, until it finds either "${_constants.JEST_CONFIG}" or\n` +
  `"${_constants.PACKAGE_JSON}".`;
