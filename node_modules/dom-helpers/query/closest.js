"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = closest;

var _matches = _interopRequireDefault(require("./matches"));

var isDoc = function isDoc(obj) {
  return obj != null && obj.nodeType === obj.DOCUMENT_NODE;
};

function closest(node, selector, context) {
  while (node && (isDoc(node) || !(0, _matches.default)(node, selector))) {
    node = node !== context && !isDoc(node) ? node.parentNode : undefined;
  }

  return node;
}

module.exports = exports["default"];