"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.defaultWebIncludes = void 0;
const defaultWebIncludes = ["web.timers", "web.immediate", "web.dom.iterable"];
exports.defaultWebIncludes = defaultWebIncludes;

function _default(targets) {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");
  return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
}