'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MalformedPackageJsonError = exports.NotFoundPackageJsonError = void 0;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
class NotFoundPackageJsonError extends Error {
  constructor(rootDir) {
    super(`Could not find a "package.json" file in ${rootDir}`);
    this.name = '';
    Error.captureStackTrace(this, () => {});
  }
}

exports.NotFoundPackageJsonError = NotFoundPackageJsonError;

class MalformedPackageJsonError extends Error {
  constructor(packageJsonPath) {
    super(
      `There is malformed json in ${packageJsonPath}\n` +
        'Fix it, and then run "jest --init"'
    );
    this.name = '';
    Error.captureStackTrace(this, () => {});
  }
}

exports.MalformedPackageJsonError = MalformedPackageJsonError;
