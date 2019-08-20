/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 * @format
 */
'use strict';

var GraphQLMultiReporter =
/*#__PURE__*/
function () {
  function GraphQLMultiReporter() {
    for (var _len = arguments.length, reporters = new Array(_len), _key = 0; _key < _len; _key++) {
      reporters[_key] = arguments[_key];
    }

    this._reporters = reporters;
  }

  var _proto = GraphQLMultiReporter.prototype;

  _proto.reportMessage = function reportMessage(message) {
    this._reporters.forEach(function (reporter) {
      reporter.reportMessage(message);
    });
  };

  _proto.reportTime = function reportTime(name, ms) {
    this._reporters.forEach(function (reporter) {
      reporter.reportTime(name, ms);
    });
  };

  _proto.reportError = function reportError(caughtLocation, error) {
    this._reporters.forEach(function (reporter) {
      reporter.reportError(caughtLocation, error);
    });
  };

  return GraphQLMultiReporter;
}();

module.exports = GraphQLMultiReporter;