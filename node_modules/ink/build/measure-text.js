"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _widestLine = _interopRequireDefault(require("widest-line"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = text => {
  const width = (0, _widestLine.default)(text);
  const height = text.split('\n').length;
  return {
    width,
    height
  };
};

exports.default = _default;