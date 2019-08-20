'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printDiffOrStringified = void 0;

var _jestDiff = _interopRequireWildcard(require('jest-diff'));

var _jestGetType = _interopRequireWildcard(require('jest-get-type'));

var _jestMatcherUtils = require('jest-matcher-utils');

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const isLineDiffable = received => {
  const receivedType = (0, _jestGetType.default)(received);

  if ((0, _jestGetType.isPrimitive)(received)) {
    return typeof received === 'string' && received.includes('\n');
  }

  if (
    receivedType === 'date' ||
    receivedType === 'function' ||
    receivedType === 'regexp'
  ) {
    return false;
  }

  if (received instanceof Error) {
    return false;
  }

  if (
    receivedType === 'object' &&
    typeof received.asymmetricMatch === 'function'
  ) {
    return false;
  }

  return true;
};

const printDiffOrStringified = (
  expectedSerializedTrimmed,
  receivedSerializedTrimmed,
  received,
  expectedLabel,
  receivedLabel,
  expand
) => {
  if (typeof received === 'string') {
    if (
      expectedSerializedTrimmed.length >= 2 &&
      expectedSerializedTrimmed.startsWith('"') &&
      expectedSerializedTrimmed.endsWith('"') &&
      receivedSerializedTrimmed ===
        (0, _utils.unescape)((0, _prettyFormat.default)(received))
    ) {
      // The expected snapshot looks like a stringified string.
      // The received serialization is default stringified string.
      // Undo default serialization of expected snapshot:
      // Remove enclosing double quote marks.
      // Remove backslash escape preceding backslash here,
      // because unescape replaced it only preceding double quote mark.
      return (0, _jestMatcherUtils.printDiffOrStringify)(
        expectedSerializedTrimmed.slice(1, -1).replace(/\\\\/g, '\\'),
        received,
        expectedLabel,
        receivedLabel,
        expand
      );
    } // Display substring highlight even when strings have custom serialization.

    const result = (0, _jestDiff.getStringDiff)(
      expectedSerializedTrimmed,
      receivedSerializedTrimmed,
      {
        aAnnotation: expectedLabel,
        bAnnotation: receivedLabel,
        expand
      }
    );

    if (result !== null) {
      if (result.isMultiline) {
        return result.annotatedDiff;
      } // Because not default stringify, call EXPECTED_COLOR and RECEIVED_COLOR
      // This is reason to call getStringDiff instead of printDiffOrStringify
      // Because there is no closing double quote mark at end of single lines,
      // future improvement is to call replaceSpacesAtEnd if it becomes public.

      const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
        expectedLabel,
        receivedLabel
      );
      return (
        printLabel(expectedLabel) +
        (0, _jestMatcherUtils.EXPECTED_COLOR)(result.a) +
        '\n' +
        printLabel(receivedLabel) +
        (0, _jestMatcherUtils.RECEIVED_COLOR)(result.b)
      );
    }
  }

  if (
    (expectedSerializedTrimmed.includes('\n') ||
      receivedSerializedTrimmed.includes('\n')) &&
    isLineDiffable(received)
  ) {
    return (0, _jestDiff.default)(
      expectedSerializedTrimmed,
      receivedSerializedTrimmed,
      {
        aAnnotation: expectedLabel,
        bAnnotation: receivedLabel,
        expand
      }
    );
  }

  const printLabel = (0, _jestMatcherUtils.getLabelPrinter)(
    expectedLabel,
    receivedLabel
  );
  return (
    printLabel(expectedLabel) +
    (0, _jestMatcherUtils.EXPECTED_COLOR)(expectedSerializedTrimmed) +
    '\n' +
    printLabel(receivedLabel) +
    (0, _jestMatcherUtils.RECEIVED_COLOR)(receivedSerializedTrimmed)
  );
};

exports.printDiffOrStringified = printDiffOrStringified;
