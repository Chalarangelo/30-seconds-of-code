"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-typeof-symbol",
    visitor: {
      Scope({
        scope
      }) {
        if (!scope.getBinding("Symbol")) {
          return;
        }

        scope.rename("Symbol");
      },

      UnaryExpression(path) {
        const {
          node,
          parent
        } = path;
        if (node.operator !== "typeof") return;

        if (path.parentPath.isBinaryExpression() && _core().types.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
          const opposite = path.getOpposite();

          if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") {
            return;
          }
        }

        const helper = this.addHelper("typeof");
        const isUnderHelper = path.findParent(path => {
          return path.isVariableDeclarator() && path.node.id === helper || path.isFunctionDeclaration() && path.node.id && path.node.id.name === helper.name;
        });

        if (isUnderHelper) {
          return;
        }

        const call = _core().types.callExpression(helper, [node.argument]);

        const arg = path.get("argument");

        if (arg.isIdentifier() && !path.scope.hasBinding(arg.node.name, true)) {
          const unary = _core().types.unaryExpression("typeof", _core().types.cloneNode(node.argument));

          path.replaceWith(_core().types.conditionalExpression(_core().types.binaryExpression("===", unary, _core().types.stringLiteral("undefined")), _core().types.stringLiteral("undefined"), call));
        } else {
          path.replaceWith(call);
        }
      }

    }
  };
});

exports.default = _default;