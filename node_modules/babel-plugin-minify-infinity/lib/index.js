"use strict";

module.exports = function (_ref) {
  var t = _ref.types;

  var INFINITY = t.binaryExpression("/", t.numericLiteral(1), t.numericLiteral(0));
  return {
    name: "minify-infinity",
    visitor: {
      // Infinity -> 1 / 0
      Identifier(path) {
        if (path.node.name !== "Infinity") {
          return;
        }

        // It's a referenced identifier
        if (path.scope.getBinding("Infinity")) {
          return;
        }

        if (path.parentPath.isObjectProperty({ key: path.node })) {
          return;
        }

        if (path.parentPath.isMemberExpression()) {
          return;
        }

        if (path.isLVal() && !path.parentPath.isExpressionStatement()) {
          return;
        }

        path.replaceWith(INFINITY);
      }
    }
  };
};