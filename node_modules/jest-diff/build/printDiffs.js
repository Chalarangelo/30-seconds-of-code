'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getStringDiff = exports.printMultilineStringDiffs = exports.createPatchMark = exports.printAnnotation = exports.hasCommonDiff = exports.computeStringDiffs = exports.printCommonLine = exports.printInsertLine = exports.printDeleteLine = exports.MULTILINE_REGEXP = exports.getReceivedString = exports.getExpectedString = exports.getHighlightedString = exports.RECEIVED_COLOR = exports.INVERTED_COLOR = exports.EXPECTED_COLOR = exports.DIM_COLOR = void 0;

var _chalk = _interopRequireDefault(require('chalk'));

var _cleanupSemantic = require('./cleanupSemantic');

var _diffStrings = _interopRequireDefault(require('./diffStrings'));

var _getAlignedDiffs = _interopRequireDefault(require('./getAlignedDiffs'));

var _joinAlignedDiffs = require('./joinAlignedDiffs');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DIM_COLOR = _chalk.default.dim;
exports.DIM_COLOR = DIM_COLOR;
const EXPECTED_COLOR = _chalk.default.green;
exports.EXPECTED_COLOR = EXPECTED_COLOR;
const INVERTED_COLOR = _chalk.default.inverse;
exports.INVERTED_COLOR = INVERTED_COLOR;
const RECEIVED_COLOR = _chalk.default.red;
exports.RECEIVED_COLOR = RECEIVED_COLOR;
const PATCH_COLOR = _chalk.default.yellow; // Given change op and array of diffs, return concatenated string:
// * include common strings
// * include change strings which have argument op (inverse highlight)
// * exclude change strings which have opposite op

const getHighlightedString = (op, diffs) =>
  diffs.reduce(
    (reduced, diff) =>
      reduced +
      (diff[0] === _cleanupSemantic.DIFF_EQUAL
        ? diff[1]
        : diff[0] === op
        ? INVERTED_COLOR(diff[1])
        : ''),
    ''
  );

exports.getHighlightedString = getHighlightedString;

const getExpectedString = diffs =>
  getHighlightedString(_cleanupSemantic.DIFF_DELETE, diffs);

exports.getExpectedString = getExpectedString;

const getReceivedString = diffs =>
  getHighlightedString(_cleanupSemantic.DIFF_INSERT, diffs);

exports.getReceivedString = getReceivedString;
const MULTILINE_REGEXP = /\n/;
exports.MULTILINE_REGEXP = MULTILINE_REGEXP;
const NEWLINE_SYMBOL = '\u{21B5}'; // downwards arrow with corner leftwards

const SPACE_SYMBOL = '\u{00B7}'; // middle dot
// Instead of inverse highlight which now implies a change,
// replace common spaces with middle dot at the end of the line.

const replaceSpacesAtEnd = line =>
  line.replace(/\s+$/, spaces => SPACE_SYMBOL.repeat(spaces.length));

const printDeleteLine = line =>
  EXPECTED_COLOR(line.length !== 0 ? '- ' + replaceSpacesAtEnd(line) : '-');

exports.printDeleteLine = printDeleteLine;

const printInsertLine = line =>
  RECEIVED_COLOR(line.length !== 0 ? '+ ' + replaceSpacesAtEnd(line) : '+'); // Prevent visually ambiguous empty line as the first or the last.

exports.printInsertLine = printInsertLine;

const printCommonLine = (line, isFirstOrLast = false) =>
  line.length !== 0
    ? DIM_COLOR('  ' + replaceSpacesAtEnd(line))
    : isFirstOrLast
    ? DIM_COLOR('  ' + NEWLINE_SYMBOL)
    : '';

exports.printCommonLine = printCommonLine;

const computeStringDiffs = (expected, received) => {
  const isMultiline =
    MULTILINE_REGEXP.test(expected) || MULTILINE_REGEXP.test(received); // getAlignedDiffs assumes that a newline was appended to the strings.

  if (isMultiline) {
    expected += '\n';
    received += '\n';
  }

  const diffs = (0, _diffStrings.default)(expected, received);
  (0, _cleanupSemantic.cleanupSemantic)(diffs); // impure function

  return {
    diffs,
    isMultiline
  };
};

exports.computeStringDiffs = computeStringDiffs;

const hasCommonDiff = (diffs, isMultiline) => {
  if (isMultiline) {
    // Important: Ignore common newline that was appended to multiline strings!
    const iLast = diffs.length - 1;
    return diffs.some(
      (diff, i) =>
        diff[0] === _cleanupSemantic.DIFF_EQUAL &&
        (i !== iLast || diff[1] !== '\n')
    );
  }

  return diffs.some(diff => diff[0] === _cleanupSemantic.DIFF_EQUAL);
};

exports.hasCommonDiff = hasCommonDiff;

const printAnnotation = options =>
  EXPECTED_COLOR('- ' + ((options && options.aAnnotation) || 'Expected')) +
  '\n' +
  RECEIVED_COLOR('+ ' + ((options && options.bAnnotation) || 'Received')) +
  '\n\n'; // In GNU diff format, indexes are one-based instead of zero-based.

exports.printAnnotation = printAnnotation;

const createPatchMark = (aStart, aEnd, bStart, bEnd) =>
  PATCH_COLOR(
    `@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`
  ); // Return formatted diff lines without labels.

exports.createPatchMark = createPatchMark;

const printMultilineStringDiffs = (diffs, expand) => {
  const lines = (0, _getAlignedDiffs.default)(diffs);
  return expand
    ? (0, _joinAlignedDiffs.joinAlignedDiffsExpand)(lines)
    : (0, _joinAlignedDiffs.joinAlignedDiffsNoExpand)(lines);
};

exports.printMultilineStringDiffs = printMultilineStringDiffs;
const MAX_DIFF_STRING_LENGTH = 20000;

// Print specific substring diff for strings only:
// * if strings are not equal
// * if neither string is empty
// * if neither string is too long
// * if there is a common string after semantic cleanup
const getStringDiff = (expected, received, options) => {
  if (
    expected === received ||
    expected.length === 0 ||
    received.length === 0 ||
    expected.length > MAX_DIFF_STRING_LENGTH ||
    received.length > MAX_DIFF_STRING_LENGTH
  ) {
    return null;
  }

  const _computeStringDiffs = computeStringDiffs(expected, received),
    diffs = _computeStringDiffs.diffs,
    isMultiline = _computeStringDiffs.isMultiline;

  if (!hasCommonDiff(diffs, isMultiline)) {
    return null;
  }

  return isMultiline
    ? {
        annotatedDiff:
          printAnnotation(options) +
          printMultilineStringDiffs(
            diffs,
            options === undefined || options.expand !== false
          ),
        isMultiline
      }
    : {
        a: getExpectedString(diffs),
        b: getReceivedString(diffs),
        isMultiline
      };
};

exports.getStringDiff = getStringDiff;
