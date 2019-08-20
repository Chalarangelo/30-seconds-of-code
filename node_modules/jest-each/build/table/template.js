'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getPath = getPath;
exports.default = void 0;

function _prettyFormat() {
  const data = _interopRequireDefault(require('pretty-format'));

  _prettyFormat = function _prettyFormat() {
    return data;
  };

  return data;
}

function _jestGetType() {
  const data = require('jest-get-type');

  _jestGetType = function _jestGetType() {
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
var _default = (title, headings, row) => {
  const table = convertRowToTable(row, headings);
  const templates = convertTableToTemplates(table, headings);
  return templates.map(template => ({
    arguments: [template],
    title: interpolate(title, template)
  }));
};

exports.default = _default;

const convertRowToTable = (row, headings) =>
  Array.from({
    length: row.length / headings.length
  }).map((_, index) =>
    row.slice(
      index * headings.length,
      index * headings.length + headings.length
    )
  );

const convertTableToTemplates = (table, headings) =>
  table.map(row =>
    row.reduce(
      (acc, value, index) =>
        Object.assign(acc, {
          [headings[index]]: value
        }),
      {}
    )
  );

const interpolate = (title, template) =>
  Object.keys(template)
    .reduce(getMatchingKeyPaths(title), []) // aka flatMap
    .reduce(replaceKeyPathWithValue(template), title);

const getMatchingKeyPaths = title => (matches, key) =>
  matches.concat(title.match(new RegExp(`\\$${key}[\\.\\w]*`, 'g')) || []);

const replaceKeyPathWithValue = template => (title, match) => {
  const keyPath = match.replace('$', '').split('.');
  const value = getPath(template, keyPath);

  if ((0, _jestGetType().isPrimitive)(value)) {
    return title.replace(match, String(value));
  }

  return title.replace(
    match,
    (0, _prettyFormat().default)(value, {
      maxDepth: 1,
      min: true
    })
  );
};
/* eslint import/export: 0*/

function getPath(template, [head, ...tail]) {
  if (!head || !template.hasOwnProperty || !template.hasOwnProperty(head))
    return template;
  return getPath(template[head], tail);
}
