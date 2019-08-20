"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = ownerWindow;

var _ownerDocument = _interopRequireDefault(require("./ownerDocument"));

function ownerWindow(node) {
  var doc = (0, _ownerDocument.default)(node);
  return doc && doc.defaultView || doc.parentWindow;
}

module.exports = exports["default"];