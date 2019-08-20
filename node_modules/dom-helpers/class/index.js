"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _addClass = _interopRequireDefault(require("./addClass"));

exports.addClass = _addClass.default;

var _removeClass = _interopRequireDefault(require("./removeClass"));

exports.removeClass = _removeClass.default;

var _hasClass = _interopRequireDefault(require("./hasClass"));

exports.hasClass = _hasClass.default;
var _default = {
  addClass: _addClass.default,
  removeClass: _removeClass.default,
  hasClass: _hasClass.default
};
exports.default = _default;