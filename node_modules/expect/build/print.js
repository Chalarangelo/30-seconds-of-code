'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printReceivedConstructorNameNot = exports.printReceivedConstructorName = exports.printExpectedConstructorNameNot = exports.printExpectedConstructorName = exports.printReceivedArrayContainExpectedItem = exports.printReceivedStringContainExpectedResult = exports.printReceivedStringContainExpectedSubstring = void 0;

var _jestMatcherUtils = require('jest-matcher-utils');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Format substring but do not enclose in double quote marks.
// The replacement is compatible with pretty-format package.
const printSubstring = val => val.replace(/"|\\/g, '\\$&');

const printReceivedStringContainExpectedSubstring = (received, start, length) =>
  (0, _jestMatcherUtils.RECEIVED_COLOR)(
    '"' +
      printSubstring(received.slice(0, start)) +
      (0, _jestMatcherUtils.INVERTED_COLOR)(
        printSubstring(received.slice(start, start + length))
      ) +
      printSubstring(received.slice(start + length)) +
      '"'
  );

exports.printReceivedStringContainExpectedSubstring = printReceivedStringContainExpectedSubstring;

const printReceivedStringContainExpectedResult = (received, result) =>
  result === null
    ? (0, _jestMatcherUtils.printReceived)(received)
    : printReceivedStringContainExpectedSubstring(
        received,
        result.index,
        result[0].length
      ); // The serialized array is compatible with pretty-format package min option.
// However, items have default stringify depth (instead of depth - 1)
// so expected item looks consistent by itself and enclosed in the array.

exports.printReceivedStringContainExpectedResult = printReceivedStringContainExpectedResult;

const printReceivedArrayContainExpectedItem = (received, index) =>
  (0, _jestMatcherUtils.RECEIVED_COLOR)(
    '[' +
      received
        .map((item, i) => {
          const stringified = (0, _jestMatcherUtils.stringify)(item);
          return i === index
            ? (0, _jestMatcherUtils.INVERTED_COLOR)(stringified)
            : stringified;
        })
        .join(', ') +
      ']'
  );

exports.printReceivedArrayContainExpectedItem = printReceivedArrayContainExpectedItem;

const printExpectedConstructorName = (label, expected) =>
  printConstructorName(label, expected, false, true) + '\n';

exports.printExpectedConstructorName = printExpectedConstructorName;

const printExpectedConstructorNameNot = (label, expected) =>
  printConstructorName(label, expected, true, true) + '\n';

exports.printExpectedConstructorNameNot = printExpectedConstructorNameNot;

const printReceivedConstructorName = (label, received) =>
  printConstructorName(label, received, false, false) + '\n'; // Do not call function if received is equal to expected.

exports.printReceivedConstructorName = printReceivedConstructorName;

const printReceivedConstructorNameNot = (label, received, expected) =>
  typeof expected.name === 'string' &&
  expected.name.length !== 0 &&
  typeof received.name === 'string' &&
  received.name.length !== 0
    ? printConstructorName(label, received, true, false) +
      ` ${
        Object.getPrototypeOf(received) === expected
          ? 'extends'
          : 'extends … extends'
      } ${(0, _jestMatcherUtils.EXPECTED_COLOR)(expected.name)}` +
      '\n'
    : printConstructorName(label, received, false, false) + '\n';

exports.printReceivedConstructorNameNot = printReceivedConstructorNameNot;

const printConstructorName = (label, constructor, isNot, isExpected) =>
  typeof constructor.name !== 'string'
    ? `${label} name is not a string`
    : constructor.name.length === 0
    ? `${label} name is an empty string`
    : `${label}: ${!isNot ? '' : isExpected ? 'not ' : '    '}${
        isExpected
          ? (0, _jestMatcherUtils.EXPECTED_COLOR)(constructor.name)
          : (0, _jestMatcherUtils.RECEIVED_COLOR)(constructor.name)
      }`;
