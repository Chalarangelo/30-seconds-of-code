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

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-function-name",
    visitor: {
      FunctionExpression: {
        exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            const replacement = (0, _helperFunctionName().default)(path);
            if (replacement) path.replaceWith(replacement);
          }
        }

      },

      ObjectProperty(path) {
        const value = path.get("value");

        if (value.isFunction()) {
          const newNode = (0, _helperFunctionName().default)(value);
          if (newNode) value.replaceWith(newNode);
        }
      }

    }
  };
});

exports.default = _default;