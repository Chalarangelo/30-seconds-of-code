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
    name: "transform-member-expression-literals",
    visitor: {
      MemberExpression: {
        exit({
          node
        }) {
          const prop = node.property;

          if (!node.computed && _core().types.isIdentifier(prop) && !_core().types.isValidES3Identifier(prop.name)) {
            node.property = _core().types.stringLiteral(prop.name);
            node.computed = true;
          }
        }

      }
    }
  };
});

exports.default = _default;