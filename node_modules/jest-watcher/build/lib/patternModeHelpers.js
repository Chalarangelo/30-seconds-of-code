'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printRestoredPatternCaret = exports.printPatternCaret = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _ansiEscapes() {
  const data = _interopRequireDefault(require('ansi-escapes'));

  _ansiEscapes = function _ansiEscapes() {
    return data;
  };

  return data;
}

function _stringLength() {
  const data = _interopRequireDefault(require('string-length'));

  _stringLength = function _stringLength() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const printPatternCaret = (pattern, pipe) => {
  const inputText = `${_chalk().default.dim(' pattern \u203A')} ${pattern}`;
  pipe.write(_ansiEscapes().default.eraseDown);
  pipe.write(inputText);
  pipe.write(_ansiEscapes().default.cursorSavePosition);
};

exports.printPatternCaret = printPatternCaret;

const printRestoredPatternCaret = (pattern, currentUsageRows, pipe) => {
  const inputText = `${_chalk().default.dim(' pattern \u203A')} ${pattern}`;
  pipe.write(
    _ansiEscapes().default.cursorTo(
      (0, _stringLength().default)(inputText),
      currentUsageRows - 1
    )
  );
  pipe.write(_ansiEscapes().default.cursorRestorePosition);
};

exports.printRestoredPatternCaret = printRestoredPatternCaret;
