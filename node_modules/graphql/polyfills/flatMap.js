"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-redeclare */
// $FlowFixMe
var flatMap = Array.prototype.flatMap ? function (list, fn) {
  // $FlowFixMe
  return Array.prototype.flatMap.call(list, fn);
} : function (list, fn) {
  var result = [];

  for (var i = 0; i < list.length; i++) {
    var value = fn(list[i]);

    if (Array.isArray(value)) {
      result = result.concat(value);
    } else {
      result.push(value);
    }
  }

  return result;
};
var _default = flatMap;
exports.default = _default;
