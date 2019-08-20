"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneNode = cloneNode;

function cloneNode(n) {
  // $FlowIgnore
  var newObj = {};

  for (var k in n) {
    newObj[k] = n[k];
  }

  return newObj;
}