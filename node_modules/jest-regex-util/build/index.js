'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.replacePathSepForRegex = exports.escapeStrForRegex = exports.escapePathForRegex = void 0;

var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const escapePathForRegex = dir => {
  if (_path.default.sep === '\\') {
    // Replace "\" with "/" so it's not escaped by escapeStrForRegex.
    // replacePathSepForRegex will convert it back.
    dir = dir.replace(/\\/g, '/');
  }

  return replacePathSepForRegex(escapeStrForRegex(dir));
};

exports.escapePathForRegex = escapePathForRegex;

const escapeStrForRegex = string =>
  string.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');

exports.escapeStrForRegex = escapeStrForRegex;

const replacePathSepForRegex = string => {
  if (_path.default.sep === '\\') {
    return string.replace(
      /(\/|(.)?\\(?![[\]{}()*+?.^$|\\]))/g,
      (_match, _, p2) => (p2 && p2 !== '\\' ? p2 + '\\\\' : '\\\\')
    );
  }

  return string;
};

exports.replacePathSepForRegex = replacePathSepForRegex;
