"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNode;

var _definitions = require("../definitions");

function isNode(node) {
  return !!(node && _definitions.VISITOR_KEYS[node.type]);
}