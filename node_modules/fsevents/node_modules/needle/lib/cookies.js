
//  Simple cookie handling implementation based on the standard RFC 6265.
//
//  This module just has two functionalities:
//    - Parse a set-cookie-header as a key value object
//    - Write a cookie-string from a key value object
//
//  All cookie attributes are ignored.

var unescape = require('querystring').unescape;

var COOKIE_PAIR        = /^([^=\s]+)\s*=\s*("?)\s*(.*)\s*\2\s*$/;
var EXCLUDED_CHARS     = /[\x00-\x1F\x7F\x3B\x3B\s\"\,\\"%]/g;
var TRAILING_SEMICOLON = /\x3B+$/;
var SEP_SEMICOLON      = /\s*\x3B\s*/;

// i know these should be 'const', but I'd like to keep
// supporting earlier node.js versions as long as I can. :)

var KEY_INDEX   = 1; // index of key from COOKIE_PAIR match
var VALUE_INDEX = 3; // index of value from COOKIE_PAIR match

// Returns a copy str trimmed and without trainling semicolon.
function cleanCookieString(str) {
  return str.trim().replace(/\x3B+$/, '');
}

function getFirstPair(str) {
  var index = str.indexOf('\x3B');
  return index === -1 ? str : str.substr(0, index);
}

// Returns a encoded copy of str based on RFC6265 S4.1.1.
function encodeCookieComponent(str) {
  return str.toString().replace(EXCLUDED_CHARS, encodeURIComponent);
}

// Parses a set-cookie-string based on the standard defined in RFC6265 S4.1.1.
function parseSetCookieString(str) {
  str = cleanCookieString(str);
  str = getFirstPair(str);

  var res = COOKIE_PAIR.exec(str);
  if (!res || !res[VALUE_INDEX]) return null;

  return {
    name  : unescape(res[KEY_INDEX]),
    value : unescape(res[VALUE_INDEX])
  };
}

// Parses a set-cookie-header and returns a key/value object.
// Each key represents the name of a cookie.
function parseSetCookieHeader(header) {
  if (!header) return {};
  header = Array.isArray(header) ? header : [header];

  return header.reduce(function(res, str) {
    var cookie = parseSetCookieString(str);
    if (cookie) res[cookie.name] = cookie.value;
    return res;
  }, {});
}

// Writes a set-cookie-string based on the standard definded in RFC6265 S4.1.1.
function writeCookieString(obj) {
  return Object.keys(obj).reduce(function(str, name) {
    var encodedName  = encodeCookieComponent(name);
    var encodedValue = encodeCookieComponent(obj[name]);
    str += (str ? '; ' : '') + encodedName + '=' + encodedValue;
    return str;
  }, '');
}

// returns a key/val object from an array of cookie strings
exports.read = parseSetCookieHeader;

// writes a cookie string header
exports.write = writeCookieString;
