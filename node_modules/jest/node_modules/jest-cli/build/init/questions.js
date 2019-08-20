'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.testScriptQuestion = exports.default = void 0;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const defaultQuestions = [
  {
    choices: [
      {
        title: 'node',
        value: 'node'
      },
      {
        title: 'jsdom (browser-like)',
        value: 'jsdom'
      }
    ],
    initial: 0,
    message: 'Choose the test environment that will be used for testing',
    name: 'environment',
    type: 'select'
  },
  {
    initial: false,
    message: 'Do you want Jest to add coverage reports?',
    name: 'coverage',
    type: 'confirm'
  },
  {
    initial: false,
    message: 'Automatically clear mock calls and instances between every test?',
    name: 'clearMocks',
    type: 'confirm'
  }
];
var _default = defaultQuestions;
exports.default = _default;
const testScriptQuestion = {
  initial: true,
  message:
    'Would you like to use Jest when running "test" script in "package.json"?',
  name: 'scripts',
  type: 'confirm'
};
exports.testScriptQuestion = testScriptQuestion;
