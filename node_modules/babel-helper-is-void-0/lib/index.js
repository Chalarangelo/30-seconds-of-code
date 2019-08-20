"use strict";

module.exports = function (t) {
  return function isVoid0(expr) {
    return t.isUnaryExpression(expr, { operator: "void" }) && t.isNumericLiteral(expr.argument, { value: 0 });
  };
};