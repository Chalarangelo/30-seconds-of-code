"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrapString = _interopRequireDefault(require("./wrapString"));

var _wrapWord = _interopRequireDefault(require("./wrapWord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a single cell value into a list of lines
 *
 * Always wraps on newlines, for the remainder uses either word or string wrapping
 * depending on user configuration.
 *
 * @param {string} cellValue
 * @param {number} columnWidth
 * @param {boolean} useWrapWord
 * @returns {Array}
 */
const wrapCell = (cellValue, columnWidth, useWrapWord) => {
  // First split on literal newlines
  const cellLines = cellValue.split('\n'); // Then iterate over the list and word-wrap every remaining line if necessary.

  for (let lineNr = 0; lineNr < cellLines.length;) {
    let lineChunks;

    if (useWrapWord) {
      lineChunks = (0, _wrapWord.default)(cellLines[lineNr], columnWidth);
    } else {
      lineChunks = (0, _wrapString.default)(cellLines[lineNr], columnWidth);
    } // Replace our original array element with whatever the wrapping returned


    cellLines.splice(lineNr, 1, ...lineChunks);
    lineNr += lineChunks.length;
  }

  return cellLines;
};

var _default = wrapCell;
exports.default = _default;
//# sourceMappingURL=wrapCell.js.map