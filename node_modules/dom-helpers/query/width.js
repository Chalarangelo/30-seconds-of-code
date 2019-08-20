"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = width;

var _offset = _interopRequireDefault(require("./offset"));

var _isWindow = _interopRequireDefault(require("./isWindow"));

function width(node, client) {
  var win = (0, _isWindow.default)(node);
  return win ? win.innerWidth : client ? node.clientWidth : (0, _offset.default)(node).width;
}

module.exports = exports["default"];