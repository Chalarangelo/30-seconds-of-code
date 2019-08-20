'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = require('../../utilities');

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (objectTypeIndexer) {
    // type X = { [a: b]: c }
    //              ^
    report({
      colon: (0, _utilities.getTokenBeforeParens)(sourceCode, objectTypeIndexer.key),
      node: objectTypeIndexer
    });

    // type X = { [a: b]: c }
    //                  ^
    report({
      colon: sourceCode.getTokenAfter((0, _utilities.getTokenAfterParens)(sourceCode, objectTypeIndexer.key)),
      node: objectTypeIndexer
    });
  };
};

module.exports = exports['default'];