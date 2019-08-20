'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _gracefulFs() {
  const data = _interopRequireDefault(require('graceful-fs'));

  _gracefulFs = function _gracefulFs() {
    return data;
  };

  return data;
}

function _callsites() {
  const data = _interopRequireDefault(require('callsites'));

  _callsites = function _callsites() {
    return data;
  };

  return data;
}

function _sourceMap() {
  const data = require('source-map');

  _sourceMap = function _sourceMap() {
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
// Copied from https://github.com/rexxars/sourcemap-decorate-callsites/blob/5b9735a156964973a75dc62fd2c7f0c1975458e8/lib/index.js#L113-L158
const addSourceMapConsumer = (callsite, consumer) => {
  const getLineNumber = callsite.getLineNumber;
  const getColumnNumber = callsite.getColumnNumber;
  let position = null;

  function getPosition() {
    if (!position) {
      position = consumer.originalPositionFor({
        column: getColumnNumber.call(callsite) || -1,
        line: getLineNumber.call(callsite) || -1
      });
    }

    return position;
  }

  Object.defineProperties(callsite, {
    getColumnNumber: {
      value() {
        return getPosition().column || getColumnNumber.call(callsite);
      },

      writable: false
    },
    getLineNumber: {
      value() {
        return getPosition().line || getLineNumber.call(callsite);
      },

      writable: false
    }
  });
};

var _default = (level, sourceMaps) => {
  const levelAfterThisCall = level + 1;
  const stack = (0, _callsites().default)()[levelAfterThisCall];
  const sourceMapFileName = sourceMaps && sourceMaps[stack.getFileName() || ''];

  if (sourceMapFileName) {
    try {
      const sourceMap = _gracefulFs().default.readFileSync(
        sourceMapFileName,
        'utf8'
      ); // @ts-ignore: Not allowed to pass string

      addSourceMapConsumer(
        stack,
        new (_sourceMap()).SourceMapConsumer(sourceMap)
      );
    } catch (e) {
      // ignore
    }
  }

  return stack;
};

exports.default = _default;
