"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullish;

/**
 * Returns true if a value is null, undefined, or NaN.
 */
function isNullish(value) {
  return value === null || value === undefined || value !== value;
}
