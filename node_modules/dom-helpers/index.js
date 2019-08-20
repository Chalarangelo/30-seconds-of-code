'use strict';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
var _exportNames = {
  style: true,
  activeElement: true,
  ownerDocument: true,
  ownerWindow: true,
  requestAnimationFrame: true
};
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _style = _interopRequireDefault(require("./style"));

exports.style = _style.default;

var _events = _interopRequireWildcard(require("./events"));

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _events[key];
});

var _query = _interopRequireWildcard(require("./query"));

Object.keys(_query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _query[key];
});

var _activeElement = _interopRequireDefault(require("./activeElement"));

exports.activeElement = _activeElement.default;

var _ownerDocument = _interopRequireDefault(require("./ownerDocument"));

exports.ownerDocument = _ownerDocument.default;

var _ownerWindow = _interopRequireDefault(require("./ownerWindow"));

exports.ownerWindow = _ownerWindow.default;

var _requestAnimationFrame = _interopRequireDefault(require("./util/requestAnimationFrame"));

exports.requestAnimationFrame = _requestAnimationFrame.default;

var _default = (0, _extends2.default)({}, _events.default, _query.default, {
  style: _style.default,
  activeElement: _activeElement.default,
  ownerDocument: _ownerDocument.default,
  ownerWindow: _ownerWindow.default,
  requestAnimationFrame: _requestAnimationFrame.default
});

exports.default = _default;