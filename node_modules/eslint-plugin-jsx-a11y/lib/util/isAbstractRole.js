"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var abstractRoles = new Set((0, _toConsumableArray2["default"])(_ariaQuery.roles.keys()).filter(function (role) {
  return _ariaQuery.roles.get(role)["abstract"];
}));
var DOMElements = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());

var isAbstractRole = function isAbstractRole(tagName, attributes) {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (DOMElements.indexOf(tagName) === -1) {
    return false;
  }

  var role = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role'));
  return abstractRoles.has(role);
};

var _default = isAbstractRole;
exports["default"] = _default;