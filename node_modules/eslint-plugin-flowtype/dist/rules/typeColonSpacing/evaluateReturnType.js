'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, report) {
  var sourceCode = context.getSourceCode();

  return function (functionNode) {
    // skip FunctionTypeAnnotation, possibly another rule as it's an arrow, not a colon?
    // (foo: number) => string
    //              ^^^^
    if (functionNode.returnType && functionNode.type !== 'FunctionTypeAnnotation') {
      report({
        colon: sourceCode.getFirstToken(functionNode.returnType),
        node: functionNode,
        type: 'return type'
      });
    }
  };
};

module.exports = exports['default'];