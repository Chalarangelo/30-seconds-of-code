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

  function statementList(key, path) {
    const paths = path.get(key);

    for (const path of paths) {
      const func = path.node;
      if (!path.isFunctionDeclaration()) continue;

      const declar = _core().types.variableDeclaration("let", [_core().types.variableDeclarator(func.id, _core().types.toExpression(func))]);

      declar._blockHoist = 2;
      func.id = null;
      path.replaceWith(declar);
    }
  }

  return {
    name: "transform-block-scoped-functions",
    visitor: {
      BlockStatement(path) {
        const {
          node,
          parent
        } = path;

        if (_core().types.isFunction(parent, {
          body: node
        }) || _core().types.isExportDeclaration(parent)) {
          return;
        }

        statementList("body", path);
      },

      SwitchCase(path) {
        statementList("consequent", path);
      }

    }
  };
});

exports.default = _default;