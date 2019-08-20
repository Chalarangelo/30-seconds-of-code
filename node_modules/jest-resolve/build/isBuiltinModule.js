'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = isBuiltinModule;

function _module2() {
  const data = _interopRequireDefault(require('module'));

  _module2 = function _module2() {
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
const EXPERIMENTAL_MODULES = ['worker_threads'];
const BUILTIN_MODULES = new Set(
  _module2().default.builtinModules
    ? _module2().default.builtinModules.concat(EXPERIMENTAL_MODULES)
    : Object.keys(process.binding('natives'))
        .filter(module => !/^internal\//.test(module))
        .concat(EXPERIMENTAL_MODULES)
);

function isBuiltinModule(module) {
  return BUILTIN_MODULES.has(module);
}
