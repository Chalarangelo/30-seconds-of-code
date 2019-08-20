"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function con(n) {
  return 0x80 | n & 0x3f;
}

function encode(str) {
  var arr = str.split("").map(function (x) {
    return x.charCodeAt(0);
  });
  return _encode(arr);
}

function _encode(arr) {
  if (arr.length === 0) {
    return [];
  }

  var _arr = _toArray(arr),
      n = _arr[0],
      ns = _arr.slice(1);

  if (n < 0) {
    throw new Error("utf8");
  }

  if (n < 0x80) {
    return [n].concat(_toConsumableArray(_encode(ns)));
  }

  if (n < 0x800) {
    return [0xc0 | n >>> 6, con(n)].concat(_toConsumableArray(_encode(ns)));
  }

  if (n < 0x10000) {
    return [0xe0 | n >>> 12, con(n >>> 6), con(n)].concat(_toConsumableArray(_encode(ns)));
  }

  if (n < 0x110000) {
    return [0xf0 | n >>> 18, con(n >>> 12), con(n >>> 6), con(n)].concat(_toConsumableArray(_encode(ns)));
  }

  throw new Error("utf8");
}