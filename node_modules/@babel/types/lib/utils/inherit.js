"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inherit;

function _uniq() {
  const data = _interopRequireDefault(require("lodash/uniq"));

  _uniq = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inherit(key, child, parent) {
  if (child && parent) {
    child[key] = (0, _uniq().default)([].concat(child[key], parent[key]).filter(Boolean));
  }
}