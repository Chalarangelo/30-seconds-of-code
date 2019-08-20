'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

var _array = _interopRequireDefault(require('./table/array'));

var _template = _interopRequireDefault(require('./table/template'));

var _validation = require('./validation');

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
var _default = (cb, supportsDone = true) => (table, ...taggedTemplateData) =>
  function eachBind(title, test, timeout) {
    try {
      const tests = isArrayTable(taggedTemplateData)
        ? buildArrayTests(title, table)
        : buildTemplateTests(title, table, taggedTemplateData);
      return tests.forEach(row =>
        cb(
          row.title,
          applyArguments(supportsDone, row.arguments, test),
          timeout
        )
      );
    } catch (e) {
      const error = new (_jestUtil()).ErrorWithStack(e.message, eachBind);
      return cb(title, () => {
        throw error;
      });
    }
  };

exports.default = _default;

const isArrayTable = data => data.length === 0;

const buildArrayTests = (title, table) => {
  (0, _validation.validateArrayTable)(table);
  return (0, _array.default)(title, table);
};

const buildTemplateTests = (title, table, taggedTemplateData) => {
  const headings = getHeadingKeys(table[0]);
  (0, _validation.validateTemplateTableHeadings)(headings, taggedTemplateData);
  return (0, _template.default)(title, headings, taggedTemplateData);
};

const getHeadingKeys = headings => headings.replace(/\s/g, '').split('|');

const applyArguments = (supportsDone, params, test) =>
  supportsDone && params.length < test.length
    ? done => test(...params, done)
    : () => test(...params);
