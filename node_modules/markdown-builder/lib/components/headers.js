'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.hX = undefined;

var _util = require('../util');

/**
 * Header of specific level
 * @param {number} headerLevel 
 * @param {string} text 
 */
var hX = function hX(headerLevel, text) {
  return headerLevel > 6 ? h6(text) : _util.SECTION_LINE_BREAK + (0, _util.withPrefix)(_util.HEADER_PREFIX.repeat(headerLevel), text) + _util.SECTION_LINE_BREAK;
}; /**
    * Markdown Header utilities
    * 
    */

var h1 = function h1(text) {
  return hX(1, text);
};
var h2 = function h2(text) {
  return hX(2, text);
};
var h3 = function h3(text) {
  return hX(3, text);
};
var h4 = function h4(text) {
  return hX(4, text);
};
var h5 = function h5(text) {
  return hX(5, text);
};
var h6 = function h6(text) {
  return hX(6, text);
};

exports.hX = hX;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;