"use strict";

var parse = require("./parse");
var patchEscope = require("./patch-eslint-scope");

module.exports = function(code, options) {
  patchEscope(options);
  return parse(code, options);
};
