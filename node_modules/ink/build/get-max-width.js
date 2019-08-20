"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = yogaNode => {
  return yogaNode.getComputedWidth() - yogaNode.getComputedPadding() * 2;
};

exports.default = _default;