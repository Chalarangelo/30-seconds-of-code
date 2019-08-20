"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getImplicitRole;

var _ariaQuery = require("aria-query");

var _implicitRoles = _interopRequireDefault(require("./implicitRoles"));

/**
 * Returns an element's implicit role given its attributes and type.
 * Some elements only have an implicit role when certain props are defined.
 */
function getImplicitRole(type, attributes) {
  var implicitRole;

  if (_implicitRoles["default"][type]) {
    implicitRole = _implicitRoles["default"][type](attributes);
  }

  if (_ariaQuery.roles.has(implicitRole)) {
    return implicitRole;
  }

  return null;
}