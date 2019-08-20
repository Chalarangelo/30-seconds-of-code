'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Utility functions & helpers
 * 
 */

var withPrefix = function withPrefix(prefix, text) {
  return prefix + ' ' + text;
};

var surround = function surround(prefix, text) {
  return prefix + text + prefix;
};

exports.withPrefix = withPrefix;
exports.surround = surround;