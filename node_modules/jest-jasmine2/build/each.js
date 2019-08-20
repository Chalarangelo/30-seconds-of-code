'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _jestEach = require('jest-each');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _default = environment => {
  environment.global.it.each = (0, _jestEach.bind)(environment.global.it);
  environment.global.fit.each = (0, _jestEach.bind)(environment.global.fit);
  environment.global.xit.each = (0, _jestEach.bind)(environment.global.xit);
  environment.global.describe.each = (0, _jestEach.bind)(
    environment.global.describe,
    false
  );
  environment.global.xdescribe.each = (0, _jestEach.bind)(
    environment.global.xdescribe,
    false
  );
  environment.global.fdescribe.each = (0, _jestEach.bind)(
    environment.global.fdescribe,
    false
  );
};

exports.default = _default;
