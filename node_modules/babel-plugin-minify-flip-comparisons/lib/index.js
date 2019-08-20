"use strict";

module.exports = function (_ref) {
  var t = _ref.types;

  var isVoid0 = require("babel-helper-is-void-0")(t);

  return {
    name: "minify-flip-comparisons",
    visitor: {
      // flip comparisons with a pure right hand value, this ensures
      // consistency with comparisons and increases the length of
      // strings that gzip can match
      // typeof blah === 'function' -> 'function' === typeof blah
      BinaryExpression(path) {
        var node = path.node;
        var right = node.right,
            left = node.left;

        // Make sure we have a constant on the right.

        if (!t.isLiteral(right) && !isVoid0(right) && !(t.isUnaryExpression(right) && t.isLiteral(right.argument)) && !t.isObjectExpression(right) && !t.isArrayExpression(right)) {
          return;
        }

        // Commutative operators.
        if (t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) >= 0 || ["*", "^", "&", "|"].indexOf(node.operator) >= 0) {
          node.left = right;
          node.right = left;
          return;
        }

        if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(node.operator) >= 0) {
          node.left = right;
          node.right = left;
          var operator = void 0;
          switch (node.operator) {
            case ">":
              operator = "<";
              break;
            case "<":
              operator = ">";
              break;
            case ">=":
              operator = "<=";
              break;
            case "<=":
              operator = ">=";
              break;
          }
          node.operator = operator;
          return;
        }
      }
    }
  };
};