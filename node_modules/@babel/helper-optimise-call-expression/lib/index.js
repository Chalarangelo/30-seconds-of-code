"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _default(callee, thisNode, args) {
  if (args.length === 1 && t().isSpreadElement(args[0]) && t().isIdentifier(args[0].argument, {
    name: "arguments"
  })) {
    return t().callExpression(t().memberExpression(callee, t().identifier("apply")), [thisNode, args[0].argument]);
  } else {
    return t().callExpression(t().memberExpression(callee, t().identifier("call")), [thisNode, ...args]);
  }
}