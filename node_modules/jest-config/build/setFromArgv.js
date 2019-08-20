'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = setFromArgv;

var _utils = require('./utils');

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const specialArgs = ['_', '$0', 'h', 'help', 'config'];

function setFromArgv(options, argv) {
  const argvToOptions = Object.keys(argv)
    .filter(key => argv[key] !== undefined && specialArgs.indexOf(key) === -1)
    .reduce((options, key) => {
      switch (key) {
        case 'coverage':
          options.collectCoverage = argv[key];
          break;

        case 'json':
          options.useStderr = argv[key];
          break;

        case 'watchAll':
          options.watch = false;
          options.watchAll = argv[key];
          break;

        case 'env':
          options.testEnvironment = argv[key];
          break;

        case 'config':
          break;

        case 'coverageThreshold':
        case 'globals':
        case 'moduleNameMapper':
        case 'transform':
        case 'haste':
          const str = argv[key];

          if ((0, _utils.isJSONString)(str)) {
            options[key] = JSON.parse(str);
          }

          break;

        default:
          options[key] = argv[key];
      }

      return options;
    }, {});
  return _objectSpread(
    {},
    options,
    (0, _utils.isJSONString)(argv.config) ? JSON.parse(argv.config) : null,
    argvToOptions
  );
}
