'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _expect = _interopRequireDefault(require('expect'));

var _jestSnapshot = require('jest-snapshot');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _default = config => {
  global.expect = _expect.default;

  _expect.default.setState({
    expand: config.expand
  });

  _expect.default.extend({
    toMatchInlineSnapshot: _jestSnapshot.toMatchInlineSnapshot,
    toMatchSnapshot: _jestSnapshot.toMatchSnapshot,
    toThrowErrorMatchingInlineSnapshot:
      _jestSnapshot.toThrowErrorMatchingInlineSnapshot,
    toThrowErrorMatchingSnapshot: _jestSnapshot.toThrowErrorMatchingSnapshot
  });

  _expect.default.addSnapshotSerializer = _jestSnapshot.addSerializer;
  const jasmine = global.jasmine;
  jasmine.anything = _expect.default.anything;
  jasmine.any = _expect.default.any;
  jasmine.objectContaining = _expect.default.objectContaining;
  jasmine.arrayContaining = _expect.default.arrayContaining;
  jasmine.stringMatching = _expect.default.stringMatching;

  jasmine.addMatchers = jasmineMatchersObject => {
    const jestMatchersObject = Object.create(null);
    Object.keys(jasmineMatchersObject).forEach(name => {
      jestMatchersObject[name] = function(...args) {
        // use "expect.extend" if you need to use equality testers (via this.equal)
        const result = jasmineMatchersObject[name](null, null); // if there is no 'negativeCompare', both should be handled by `compare`

        const negativeCompare = result.negativeCompare || result.compare;
        return this.isNot
          ? negativeCompare.apply(
              null, // @ts-ignore
              args
            )
          : result.compare.apply(
              null, // @ts-ignore
              args
            );
      };
    });
    const expect = global.expect;
    expect.extend(jestMatchersObject);
  };
};

exports.default = _default;
