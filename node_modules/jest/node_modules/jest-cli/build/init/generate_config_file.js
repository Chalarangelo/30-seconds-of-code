'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _jestConfig() {
  const data = require('jest-config');

  _jestConfig = function _jestConfig() {
    return data;
  };

  return data;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const stringifyOption = (option, map, linePrefix = '') => {
  const optionDescription = `  // ${_jestConfig().descriptions[option]}`;
  const stringifiedObject = `${option}: ${JSON.stringify(
    map[option],
    null,
    2
  )}`;
  return (
    optionDescription +
    '\n' +
    stringifiedObject
      .split('\n')
      .map(line => '  ' + linePrefix + line)
      .join('\n') +
    ',\n'
  );
};

const generateConfigFile = results => {
  const coverage = results.coverage,
    clearMocks = results.clearMocks,
    environment = results.environment;
  const overrides = {};

  if (coverage) {
    Object.assign(overrides, {
      coverageDirectory: 'coverage'
    });
  }

  if (environment === 'node') {
    Object.assign(overrides, {
      testEnvironment: 'node'
    });
  }

  if (clearMocks) {
    Object.assign(overrides, {
      clearMocks: true
    });
  }

  const overrideKeys = Object.keys(overrides);
  const properties = [];

  for (const option in _jestConfig().descriptions) {
    const opt = option;

    if (overrideKeys.includes(opt)) {
      properties.push(stringifyOption(opt, overrides));
    } else {
      properties.push(stringifyOption(opt, _jestConfig().defaults, '// '));
    }
  }

  return (
    '// For a detailed explanation regarding each configuration property, visit:\n' +
    '// https://jestjs.io/docs/en/configuration.html\n\n' +
    'module.exports = {\n' +
    properties.join('\n') +
    '};\n'
  );
};

var _default = generateConfigFile;
exports.default = _default;
