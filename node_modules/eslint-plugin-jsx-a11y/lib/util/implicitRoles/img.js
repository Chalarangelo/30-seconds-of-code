"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getImplicitRoleForImg;

var _jsxAstUtils = require("jsx-ast-utils");

/**
 * Returns the implicit role for an img tag.
 */
function getImplicitRoleForImg(attributes) {
  var alt = (0, _jsxAstUtils.getProp)(attributes, 'alt');

  if (alt && (0, _jsxAstUtils.getLiteralPropValue)(alt) === '') {
    return '';
  }

  return 'img';
}