"use strict";

var flipSeen = Symbol("flipSeen");

module.exports = function (t) {
  return {
    hasSeen(node) {
      return !!node[flipSeen];
    },

    // Takes an expressions and determines if it has
    // more nodes that could benifit from flipping than not.
    shouldFlip(topNode) {
      var savings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      visit(topNode);
      return savings > 0;

      function visit(node) {
        if (t.isUnaryExpression(node, { operator: "!" })) {
          savings++;
          return;
        }

        if (t.isLogicalExpression(node)) {
          visit(node.left);
          visit(node.right);
          return;
        }

        if (!(t.isBinaryExpression(node) && t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) > -1)) {
          // Binary expressions wouldn't hurut because we know how to flip them
          savings--;
        }
      }
    },

    flip(node, resultNotUsed) {
      var lastNodeDesc = void 0;
      var ret = visit(node);

      ret[flipSeen] = true;

      if (resultNotUsed && lastNodeDesc) {
        var _lastNodeDesc = lastNodeDesc,
            parent = _lastNodeDesc.parent,
            key = _lastNodeDesc.key;

        if (parent && key && t.isUnaryExpression(parent[key], { operator: "!" })) {
          parent[key] = parent[key].argument;
        }
      }

      return ret;

      function visit(node, parent, key) {
        lastNodeDesc = { parent, key };

        if (t.isUnaryExpression(node, { operator: "!" })) {
          return node.argument;
        }

        if (t.isLogicalExpression(node)) {
          node.operator = node.operator === "&&" ? "||" : "&&";
          node.left = visit(node.left, node, "left");
          node.right = visit(node.right, node, "right");
          return node;
        }

        if (t.isBinaryExpression(node)) {
          var operator = void 0;
          switch (node.operator) {
            case "!==":
              operator = "===";
              break;
            case "===":
              operator = "!==";
              break;
            case "!=":
              operator = "==";
              break;
            case "==":
              operator = "!=";
              break;
          }

          if (operator) {
            node.operator = operator;
            return node;
          }

          // Falls through to unary expression
        }

        return t.unaryExpression("!", node, true);
      }
    }
  };
};