'use strict';

exports.__esModule = true;
var ampersand = exports.ampersand = 38;
var asterisk = exports.asterisk = 42;
var at = exports.at = 64;
var comma = exports.comma = 44;
var colon = exports.colon = 58;
var semicolon = exports.semicolon = 59;
var openParenthesis = exports.openParenthesis = 40;
var closeParenthesis = exports.closeParenthesis = 41;
var openSquare = exports.openSquare = 91;
var closeSquare = exports.closeSquare = 93;
var dollar = exports.dollar = 36;
var tilde = exports.tilde = 126;
var caret = exports.caret = 94;
var plus = exports.plus = 43;
var equals = exports.equals = 61;
var pipe = exports.pipe = 124;
var greaterThan = exports.greaterThan = 62;
var space = exports.space = 32;
var singleQuote = exports.singleQuote = 39;
var doubleQuote = exports.doubleQuote = 34;
var slash = exports.slash = 47;
var bang = exports.bang = 33;

var backslash = exports.backslash = 92;
var cr = exports.cr = 13;
var feed = exports.feed = 12;
var newline = exports.newline = 10;
var tab = exports.tab = 9;

// Expose aliases primarily for readability.
var str = exports.str = singleQuote;

// No good single character representation!
var comment = exports.comment = -1;
var word = exports.word = -2;
var combinator = exports.combinator = -3;