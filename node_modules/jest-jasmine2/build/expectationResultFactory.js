'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = expectationResultFactory;

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function messageFormatter({error, message, passed}) {
  if (passed) {
    return 'Passed.';
  }

  if (message) {
    return message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (
    // duck-type Error, see #2549
    error &&
    typeof error === 'object' &&
    typeof error.message === 'string' &&
    typeof error.name === 'string'
  ) {
    return `${error.name}: ${error.message}`;
  }

  return `thrown: ${(0, _prettyFormat.default)(error, {
    maxDepth: 3
  })}`;
}

function stackFormatter(options, initError, errorMessage) {
  if (options.passed) {
    return '';
  }

  if (options.error) {
    if (options.error.stack) {
      return options.error.stack;
    }

    if (options.error === errorMessage) {
      return errorMessage;
    }
  }

  if (initError) {
    return errorMessage.trimRight() + '\n\n' + initError.stack;
  }

  return new Error(errorMessage).stack;
}

function expectationResultFactory(options, initError) {
  const message = messageFormatter(options);
  const stack = stackFormatter(options, initError, message);

  if (options.passed) {
    return {
      error: options.error,
      matcherName: options.matcherName,
      message,
      passed: options.passed,
      stack
    };
  }

  return {
    actual: options.actual,
    error: options.error,
    expected: options.expected,
    matcherName: options.matcherName,
    message,
    passed: options.passed,
    stack
  };
}
