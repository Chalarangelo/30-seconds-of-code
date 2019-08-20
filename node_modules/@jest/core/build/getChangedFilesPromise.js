'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _jestChangedFiles() {
  const data = require('jest-changed-files');

  _jestChangedFiles = function _jestChangedFiles() {
    return data;
  };

  return data;
}

function _jestMessageUtil() {
  const data = require('jest-message-util');

  _jestMessageUtil = function _jestMessageUtil() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
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
var _default = (globalConfig, configs) => {
  if (globalConfig.onlyChanged) {
    const allRootsForAllProjects = configs.reduce(
      (roots, config) => [...roots, ...(config.roots || [])],
      []
    );
    return (0, _jestChangedFiles().getChangedFilesForRoots)(
      allRootsForAllProjects,
      {
        changedSince: globalConfig.changedSince,
        lastCommit: globalConfig.lastCommit,
        withAncestor: globalConfig.changedFilesWithAncestor
      }
    ).catch(e => {
      const message = (0, _jestMessageUtil().formatExecError)(e, configs[0], {
        noStackTrace: true
      })
        .split('\n')
        .filter(line => !line.includes('Command failed:'))
        .join('\n');
      console.error(_chalk().default.red(`\n\n${message}`));
      process.exit(1); // We do process.exit, so this is dead code

      return Promise.reject(e);
    });
  }

  return undefined;
};

exports.default = _default;
