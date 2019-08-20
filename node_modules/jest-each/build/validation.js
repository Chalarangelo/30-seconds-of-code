'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateTemplateTableHeadings = exports.validateArrayTable = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _prettyFormat() {
  const data = _interopRequireDefault(require('pretty-format'));

  _prettyFormat = function _prettyFormat() {
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
 *
 */
const EXPECTED_COLOR = _chalk().default.green;

const RECEIVED_COLOR = _chalk().default.red;

const validateArrayTable = table => {
  if (!Array.isArray(table)) {
    throw new Error(
      '`.each` must be called with an Array or Tagged Template Literal.\n\n' +
        `Instead was called with: ${(0, _prettyFormat().default)(table, {
          maxDepth: 1,
          min: true
        })}\n`
    );
  }

  if (isTaggedTemplateLiteral(table)) {
    if (isEmptyString(table[0])) {
      throw new Error(
        'Error: `.each` called with an empty Tagged Template Literal of table data.\n'
      );
    }

    throw new Error(
      'Error: `.each` called with a Tagged Template Literal with no data, remember to interpolate with ${expression} syntax.\n'
    );
  }

  if (isEmptyTable(table)) {
    throw new Error(
      'Error: `.each` called with an empty Array of table data.\n'
    );
  }
};

exports.validateArrayTable = validateArrayTable;

const isTaggedTemplateLiteral = array => array.raw !== undefined;

const isEmptyTable = table => table.length === 0;

const isEmptyString = str => typeof str === 'string' && str.trim() === '';

const validateTemplateTableHeadings = (headings, data) => {
  const missingData = data.length % headings.length;

  if (missingData > 0) {
    throw new Error(
      'Not enough arguments supplied for given headings:\n' +
        EXPECTED_COLOR(headings.join(' | ')) +
        '\n\n' +
        'Received:\n' +
        RECEIVED_COLOR((0, _prettyFormat().default)(data)) +
        '\n\n' +
        `Missing ${RECEIVED_COLOR(missingData.toString())} ${pluralize(
          'argument',
          missingData
        )}`
    );
  }
};

exports.validateTemplateTableHeadings = validateTemplateTableHeadings;

const pluralize = (word, count) => word + (count === 1 ? '' : 's');
