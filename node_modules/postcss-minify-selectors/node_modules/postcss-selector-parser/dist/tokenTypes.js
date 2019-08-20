'use strict';

exports.__esModule = true;
var ampersand = exports.ampersand = '&'.charCodeAt(0);
var asterisk = exports.asterisk = '*'.charCodeAt(0);
var at = exports.at = '@'.charCodeAt(0);
var comma = exports.comma = ','.charCodeAt(0);
var colon = exports.colon = ':'.charCodeAt(0);
var semicolon = exports.semicolon = ';'.charCodeAt(0);
var openParenthesis = exports.openParenthesis = '('.charCodeAt(0);
var closeParenthesis = exports.closeParenthesis = ')'.charCodeAt(0);
var openSquare = exports.openSquare = '['.charCodeAt(0);
var closeSquare = exports.closeSquare = ']'.charCodeAt(0);
var dollar = exports.dollar = '$'.charCodeAt(0);
var tilde = exports.tilde = '~'.charCodeAt(0);
var caret = exports.caret = '^'.charCodeAt(0);
var plus = exports.plus = '+'.charCodeAt(0);
var equals = exports.equals = '='.charCodeAt(0);
var pipe = exports.pipe = '|'.charCodeAt(0);
var greaterThan = exports.greaterThan = '>'.charCodeAt(0);
var space = exports.space = ' '.charCodeAt(0);
var singleQuote = exports.singleQuote = '\''.charCodeAt(0);
var doubleQuote = exports.doubleQuote = '"'.charCodeAt(0);
var slash = exports.slash = '/'.charCodeAt(0);

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