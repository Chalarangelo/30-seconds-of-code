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

function _helperBuilderBinaryAssignmentOperatorVisitor() {
  const data = _interopRequireDefault(require("@babel/helper-builder-binary-assignment-operator-visitor"));

  _helperBuilderBinaryAssignmentOperatorVisitor = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-exponentiation-operator",
    visitor: (0, _helperBuilderBinaryAssignmentOperatorVisitor().default)({
      operator: "**",

      build(left, right) {
        return _core().types.callExpression(_core().types.memberExpression(_core().types.identifier("Math"), _core().types.identifier("pow")), [left, right]);
      }

    })
  };
});

exports.default = _default;