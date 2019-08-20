"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInvalid;

/**
 * Returns true if a value is undefined, or NaN.
 */
function isInvalid(value) {
  return value === undefined || value !== value;
}
