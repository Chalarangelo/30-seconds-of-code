"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVar;

var _generated = require("./generated");

var _constants = require("../constants");

function isVar(node) {
  return (0, _generated.isVariableDeclaration)(node, {
    kind: "var"
  }) && !node[_constants.BLOCK_SCOPED_SYMBOL];
}