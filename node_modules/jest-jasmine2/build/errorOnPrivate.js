'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.installErrorOnPrivate = installErrorOnPrivate;

var _jestUtil = require('jest-util');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// prettier-ignore
const disabledGlobals = {
  fail: 'Illegal usage of global `fail`, prefer throwing an error, or the `done.fail` callback.',
  pending: 'Illegal usage of global `pending`, prefer explicitly skipping a test using `test.skip`',
  spyOn: 'Illegal usage of global `spyOn`, prefer `jest.spyOn`.',
  spyOnProperty: 'Illegal usage of global `spyOnProperty`, prefer `jest.spyOn`.'
};
// prettier-ignore
const disabledJasmineMethods = {
  addMatchers: 'Illegal usage of `jasmine.addMatchers`, prefer `expect.extends`.',
  any: 'Illegal usage of `jasmine.any`, prefer `expect.any`.',
  anything: 'Illegal usage of `jasmine.anything`, prefer `expect.anything`.',
  arrayContaining: 'Illegal usage of `jasmine.arrayContaining`, prefer `expect.arrayContaining`.',
  createSpy: 'Illegal usage of `jasmine.createSpy`, prefer `jest.fn`.',
  objectContaining: 'Illegal usage of `jasmine.objectContaining`, prefer `expect.objectContaining`.',
  stringMatching: 'Illegal usage of `jasmine.stringMatching`, prefer `expect.stringMatching`.'
};

function installErrorOnPrivate(global) {
  const jasmine = global.jasmine;
  Object.keys(disabledGlobals).forEach(functionName => {
    global[functionName] = () => {
      throwAtFunction(disabledGlobals[functionName], global[functionName]);
    };
  });
  Object.keys(disabledJasmineMethods).forEach(methodName => {
    // @ts-ignore
    jasmine[methodName] = () => {
      throwAtFunction(disabledJasmineMethods[methodName], jasmine[methodName]);
    };
  });

  function set() {
    throwAtFunction(
      'Illegal usage of `jasmine.DEFAULT_TIMEOUT_INTERVAL`, prefer `jest.setTimeout`.',
      set
    );
  }

  const original = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  Object.defineProperty(jasmine, 'DEFAULT_TIMEOUT_INTERVAL', {
    configurable: true,
    enumerable: true,
    get: () => original,
    set
  });
}

function throwAtFunction(message, fn) {
  throw new _jestUtil.ErrorWithStack(message, fn);
}
