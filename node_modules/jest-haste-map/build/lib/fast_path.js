'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.relative = relative;
exports.resolve = resolve;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
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
// rootDir and filename must be absolute paths (resolved)
function relative(rootDir, filename) {
  return filename.indexOf(rootDir + _path().default.sep) === 0
    ? filename.substr(rootDir.length + 1)
    : _path().default.relative(rootDir, filename);
}

const INDIRECTION_FRAGMENT = '..' + _path().default.sep; // rootDir must be an absolute path and relativeFilename must be simple
// (e.g.: foo/bar or ../foo/bar, but never ./foo or foo/../bar)

function resolve(rootDir, relativeFilename) {
  return relativeFilename.indexOf(INDIRECTION_FRAGMENT) === 0
    ? _path().default.resolve(rootDir, relativeFilename)
    : rootDir + _path().default.sep + relativeFilename;
}
