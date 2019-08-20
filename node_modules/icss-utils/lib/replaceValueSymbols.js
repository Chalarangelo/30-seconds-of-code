"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var matchValueName = /[$#]?[\w-\.]+/g;

var replaceValueSymbols = function replaceValueSymbols(value, replacements) {
  var matches = void 0;
  while (matches = matchValueName.exec(value)) {
    var replacement = replacements[matches[0]];
    if (replacement) {
      value = value.slice(0, matches.index) + replacement + value.slice(matchValueName.lastIndex);
      matchValueName.lastIndex -= matches[0].length - replacement.length;
    }
  }
  return value;
};

exports.default = replaceValueSymbols;