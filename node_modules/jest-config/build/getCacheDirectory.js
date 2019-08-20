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

function _os() {
  const data = _interopRequireDefault(require('os'));

  _os = function _os() {
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
 */
const getCacheDirectory = () => {
  const _process = process,
    getuid = _process.getuid;

  const tmpdir = _path().default.join(
    (0, _realpathNative().sync)(_os().default.tmpdir()),
    'jest'
  );

  if (getuid == null) {
    return tmpdir;
  } else {
    // On some platforms tmpdir() is `/tmp`, causing conflicts between different
    // users and permission issues. Adding an additional subdivision by UID can
    // help.
    return `${tmpdir}_${getuid.call(process).toString(36)}`;
  }
};

var _default = getCacheDirectory;
exports.default = _default;
