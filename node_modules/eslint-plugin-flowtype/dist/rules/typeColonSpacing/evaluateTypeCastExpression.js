'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (typeCastExpression) {
    report({
      colon: sourceCode.getFirstToken(typeCastExpression.typeAnnotation),
      node: typeCastExpression,
      type: 'type cast'
    });
  };
};

module.exports = exports['default'];