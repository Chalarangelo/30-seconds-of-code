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

function regex() {
  const data = _interopRequireWildcard(require("@babel/helper-regex"));

  regex = function () {
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-sticky-regex",
    visitor: {
      RegExpLiteral(path) {
        const {
          node
        } = path;
        if (!regex().is(node, "y")) return;
        path.replaceWith(_core().types.newExpression(_core().types.identifier("RegExp"), [_core().types.stringLiteral(node.pattern), _core().types.stringLiteral(node.flags)]));
      }

    }
  };
});

exports.default = _default;