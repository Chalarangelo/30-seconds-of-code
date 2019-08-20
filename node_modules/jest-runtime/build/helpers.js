'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.findSiblingsWithFileExtension = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _glob() {
  const data = _interopRequireDefault(require('glob'));

  _glob = function _glob() {
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
 */
const findSiblingsWithFileExtension = (
  moduleFileExtensions,
  from,
  moduleName
) => {
  if (
    !_path().default.isAbsolute(moduleName) &&
    _path().default.extname(moduleName) === ''
  ) {
    const dirname = _path().default.dirname(from);

    const pathToModule = _path().default.resolve(dirname, moduleName);

    try {
      const slashedDirname = (0, _slash().default)(dirname);

      const matches = _glob()
        .default.sync(`${pathToModule}.*`)
        .map(match => (0, _slash().default)(match))
        .map(match => {
          const relativePath = _path().default.posix.relative(
            slashedDirname,
            match
          );

          return _path().default.posix.dirname(match) === slashedDirname
            ? `./${relativePath}`
            : relativePath;
        })
        .map(match => `\t'${match}'`)
        .join('\n');

      if (matches) {
        const foundMessage = `\n\nHowever, Jest was able to find:\n${matches}`;
        const mappedModuleFileExtensions = moduleFileExtensions
          .map(ext => `'${ext}'`)
          .join(', ');
        return (
          foundMessage +
          "\n\nYou might want to include a file extension in your import, or update your 'moduleFileExtensions', which is currently " +
          `[${mappedModuleFileExtensions}].\n\nSee https://jestjs.io/docs/en/configuration#modulefileextensions-array-string`
        );
      }
    } catch (ignored) {}
  }

  return '';
};

exports.findSiblingsWithFileExtension = findSiblingsWithFileExtension;
