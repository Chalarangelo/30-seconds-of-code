'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.s = exports.b = exports.i = undefined;

var _util = require('../util');

var _constants = require('../util/constants');

/**
 * Produces italic text
 * @param {string} text 
 */
/**
 * Markdown Emphasis utilities
 * 
 */

var i = function i(text) {
  return (0, _util.surround)(_constants.EMPHASIS_ITALICS, text);
};

/**
 * Produces bold text
 * @param {string} text 
 */
var b = function b(text) {
  return (0, _util.surround)(_constants.EMPHASIS_BOLD, text);
};

/**
 * Produces strikethroughed text
 * @param {string} text 
 */
var s = function s(text) {
  return (0, _util.surround)(_constants.EMPHASIS_STRIKETHROUGH, text);
};

exports.i = i;
exports.b = b;
exports.s = s;