"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _wrapCell = _interopRequireDefault(require("./wrapCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} value
 * @param {number} columnWidth
 * @param {boolean} useWrapWord
 * @returns {number}
 */
const calculateCellHeight = (value, columnWidth, useWrapWord = false) => {
  if (!(0, _isString2.default)(value)) {
    throw new TypeError('Value must be a string.');
  }

  if (!Number.isInteger(columnWidth)) {
    throw new TypeError('Column width must be an integer.');
  }

  if (columnWidth < 1) {
    throw new Error('Column width must be greater than 0.');
  }

  return (0, _wrapCell.default)(value, columnWidth, useWrapWord).length;
};

var _default = calculateCellHeight;
exports.default = _default;
//# sourceMappingURL=calculateCellHeight.js.map