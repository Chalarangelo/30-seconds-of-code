"use strict";

module.exports = function (_ref) {
  var t = _ref.types;

  var flipExpressions = require("babel-helper-flip-expressions")(t);

  return {
    name: "minify-guarded-expressions",
    visitor: {
      // Convert guarded expressions
      // !a && b() --> a || b();
      // This could change the return result of the expression so we only do it
      // on things where the result is ignored.
      LogicalExpression: {
        enter: [function (path) {
          var node = path.node;


          var left = path.get("left");
          var right = path.get("right");

          // issues - 171, 174, 176
          // we assume that it is returned/assigned/part of a bigger expression
          // or utilized somehow
          // we check if we shouldBail only when evaluating
          // the rightside of the expression;
          // if the left side is evaluated to be deterministic,
          // we can safely replace the entire expression
          var shouldBail = !path.parentPath.isExpressionStatement();

          if (node.operator === "&&") {
            var leftTruthy = left.evaluateTruthy();
            if (leftTruthy === false) {
              // Short-circuit
              path.replaceWith(node.left);
            } else if (leftTruthy === true && left.isPure()) {
              path.replaceWith(node.right);
            } else if (right.evaluateTruthy() === false && right.isPure() && !shouldBail) {
              path.replaceWith(node.left);
            }
          } else if (node.operator === "||") {
            var _leftTruthy = left.evaluateTruthy();
            if (_leftTruthy === false && left.isPure()) {
              path.replaceWith(node.right);
            } else if (_leftTruthy === true) {
              // Short-circuit
              path.replaceWith(node.left);
            } else if (right.evaluateTruthy() === false && right.isPure() && !shouldBail) {
              path.replaceWith(node.left);
            }
          }
        }, function (path) {
          var node = path.node;


          if (flipExpressions.hasSeen(node)) {
            return;
          }

          if (!path.parentPath.isExpressionStatement() && !(path.parentPath.isSequenceExpression() && path.parentPath.parentPath.isExpressionStatement())) {
            return;
          }

          // Start counting savings from one since we can ignore the last
          // expression.
          if (flipExpressions.shouldFlip(node, 1)) {
            var newNode = flipExpressions.flip(node, true);
            path.replaceWith(newNode);
          }
        }]
      }
    }
  };
};