"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var roles = (0, _toConsumableArray2["default"])(_ariaQuery.roles.keys());
var interactiveRoles = roles.filter(function (name) {
  return !_ariaQuery.roles.get(name)["abstract"];
}).filter(function (name) {
  return _ariaQuery.roles.get(name).superClass.some(function (klasses) {
    return (0, _arrayIncludes["default"])(klasses, 'widget');
  });
}); // 'toolbar' does not descend from widget, but it does support
// aria-activedescendant, thus in practice we treat it as a widget.

interactiveRoles.push('toolbar');
/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with an interactive component. Used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * its intention is to be interacted with in the DOM.
 *
 * isInteractiveRole is a Logical Disjunction:
 * https://en.wikipedia.org/wiki/Logical_disjunction
 * The JSX element does not have a tagName or it has a tagName and a role
 * attribute with a value in the set of non-interactive roles.
 */

var isInteractiveRole = function isInteractiveRole(tagName, attributes) {
  var value = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role')); // If value is undefined, then the role attribute will be dropped in the DOM.
  // If value is null, then getLiteralAttributeValue is telling us that the
  // value isn't in the form of a literal

  if (value === undefined || value === null) {
    return false;
  }

  var isInteractive = false;
  var normalizedValues = String(value).toLowerCase().split(' ');
  var validRoles = normalizedValues.reduce(function (accumulator, name) {
    if ((0, _arrayIncludes["default"])(roles, name)) {
      accumulator.push(name);
    }

    return accumulator;
  }, []);

  if (validRoles.length > 0) {
    // The first role value is a series takes precedence.
    isInteractive = (0, _arrayIncludes["default"])(interactiveRoles, validRoles[0]);
  }

  return isInteractive;
};

var _default = isInteractiveRole;
exports["default"] = _default;