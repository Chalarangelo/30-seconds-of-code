"use strict";

module.exports = function ({
  types: t
}) {
  const TRUE = t.unaryExpression("!", t.numericLiteral(0), true);
  const FALSE = t.unaryExpression("!", t.numericLiteral(1), true);
  return {
    name: "transform-minify-booleans",
    visitor: {
      // shorten booleans to a negation
      // true -> !0
      // false -> !1
      BooleanLiteral(path) {
        path.replaceWith(path.node.value ? TRUE : FALSE);
      }

    }
  };
};