/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var RelayFlowGenerator = require("./RelayFlowGenerator");

var formatGeneratedModule = require("./formatGeneratedModule");

var _require = require("./FindGraphQLTags"),
    find = _require.find;

module.exports = function () {
  return {
    inputExtensions: ['js', 'jsx'],
    outputExtension: 'js',
    typeGenerator: RelayFlowGenerator,
    formatModule: formatGeneratedModule,
    findGraphQLTags: find
  };
};