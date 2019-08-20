"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is = is;
exports.pullFlag = pullFlag;

function _pull() {
  const data = _interopRequireDefault(require("lodash/pull"));

  _pull = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function is(node, flag) {
  return node.type === "RegExpLiteral" && node.flags.indexOf(flag) >= 0;
}

function pullFlag(node, flag) {
  const flags = node.flags.split("");
  if (node.flags.indexOf(flag) < 0) return;
  (0, _pull().default)(flags, flag);
  node.flags = flags.join("");
}