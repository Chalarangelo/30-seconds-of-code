"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cssUnitConverter = _interopRequireDefault(require("css-unit-converter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertNodes(left, right, precision) {
  switch (left.type) {
    case 'LengthValue':
    case 'AngleValue':
    case 'TimeValue':
    case 'FrequencyValue':
    case 'ResolutionValue':
      return convertAbsoluteLength(left, right, precision);

    default:
      return {
        left,
        right
      };
  }
}

function convertAbsoluteLength(left, right, precision) {
  if (right.type === left.type) {
    right = {
      type: left.type,
      value: (0, _cssUnitConverter.default)(right.value, right.unit, left.unit, precision),
      unit: left.unit
    };
  }

  return {
    left,
    right
  };
}

var _default = convertNodes;
exports.default = _default;
module.exports = exports.default;