'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _jestMatcherUtils = require('jest-matcher-utils');

var _chalk = _interopRequireDefault(require('chalk'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const assertOperatorsMap = {
  '!=': 'notEqual',
  '!==': 'notStrictEqual',
  '==': 'equal',
  '===': 'strictEqual'
};
const humanReadableOperators = {
  deepEqual: 'to deeply equal',
  deepStrictEqual: 'to deeply and strictly equal',
  equal: 'to be equal',
  notDeepEqual: 'not to deeply equal',
  notDeepStrictEqual: 'not to deeply and strictly equal',
  notEqual: 'to not be equal',
  notStrictEqual: 'not be strictly equal',
  strictEqual: 'to strictly be equal'
};

const getOperatorName = (operator, stack) => {
  if (typeof operator === 'string') {
    return assertOperatorsMap[operator] || operator;
  }

  if (stack.match('.doesNotThrow')) {
    return 'doesNotThrow';
  }

  if (stack.match('.throws')) {
    return 'throws';
  }

  return '';
};

const operatorMessage = operator => {
  const niceOperatorName = getOperatorName(operator, '');
  const humanReadableOperator = humanReadableOperators[niceOperatorName];
  return typeof operator === 'string'
    ? `${humanReadableOperator || niceOperatorName} to:\n`
    : '';
};

const assertThrowingMatcherHint = operatorName =>
  operatorName
    ? _chalk.default.dim('assert') +
      _chalk.default.dim('.' + operatorName + '(') +
      _chalk.default.red('function') +
      _chalk.default.dim(')')
    : '';

const assertMatcherHint = (operator, operatorName, expected) => {
  let message = '';

  if (operator === '==' && expected === true) {
    message =
      _chalk.default.dim('assert') +
      _chalk.default.dim('(') +
      _chalk.default.red('received') +
      _chalk.default.dim(')');
  } else if (operatorName) {
    message =
      _chalk.default.dim('assert') +
      _chalk.default.dim('.' + operatorName + '(') +
      _chalk.default.red('received') +
      _chalk.default.dim(', ') +
      _chalk.default.green('expected') +
      _chalk.default.dim(')');
  }

  return message;
};

function assertionErrorMessage(error, options) {
  const expected = error.expected,
    actual = error.actual,
    generatedMessage = error.generatedMessage,
    message = error.message,
    operator = error.operator,
    stack = error.stack;
  const diffString = (0, _jestMatcherUtils.diff)(expected, actual, options);
  const hasCustomMessage = !generatedMessage;
  const operatorName = getOperatorName(operator, stack);
  const trimmedStack = stack
    .replace(message, '')
    .replace(/AssertionError(.*)/g, '');

  if (operatorName === 'doesNotThrow') {
    return (
      buildHintString(assertThrowingMatcherHint(operatorName)) +
      _chalk.default.reset(`Expected the function not to throw an error.\n`) +
      _chalk.default.reset(`Instead, it threw:\n`) +
      `  ${(0, _jestMatcherUtils.printReceived)(actual)}` +
      _chalk.default.reset(
        hasCustomMessage ? '\n\nMessage:\n  ' + message : ''
      ) +
      trimmedStack
    );
  }

  if (operatorName === 'throws') {
    return (
      buildHintString(assertThrowingMatcherHint(operatorName)) +
      _chalk.default.reset(`Expected the function to throw an error.\n`) +
      _chalk.default.reset(`But it didn't throw anything.`) +
      _chalk.default.reset(
        hasCustomMessage ? '\n\nMessage:\n  ' + message : ''
      ) +
      trimmedStack
    );
  }

  return (
    buildHintString(assertMatcherHint(operator, operatorName, expected)) +
    _chalk.default.reset(`Expected value ${operatorMessage(operator)}`) +
    `  ${(0, _jestMatcherUtils.printExpected)(expected)}\n` +
    _chalk.default.reset(`Received:\n`) +
    `  ${(0, _jestMatcherUtils.printReceived)(actual)}` +
    _chalk.default.reset(hasCustomMessage ? '\n\nMessage:\n  ' + message : '') +
    (diffString ? `\n\nDifference:\n\n${diffString}` : '') +
    trimmedStack
  );
}

function buildHintString(hint) {
  return hint ? hint + '\n\n' : '';
}

var _default = assertionErrorMessage;
exports.default = _default;
