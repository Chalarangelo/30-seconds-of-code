"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drawTable = _interopRequireDefault(require("./drawTable"));

var _calculateCellWidthIndex = _interopRequireDefault(require("./calculateCellWidthIndex"));

var _makeConfig = _interopRequireDefault(require("./makeConfig"));

var _calculateRowHeightIndex = _interopRequireDefault(require("./calculateRowHeightIndex"));

var _mapDataUsingRowHeightIndex = _interopRequireDefault(require("./mapDataUsingRowHeightIndex"));

var _alignTableData = _interopRequireDefault(require("./alignTableData"));

var _padTableData = _interopRequireDefault(require("./padTableData"));

var _validateTableData = _interopRequireDefault(require("./validateTableData"));

var _stringifyTableData = _interopRequireDefault(require("./stringifyTableData"));

var _truncateTableData = _interopRequireDefault(require("./truncateTableData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {string} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~columns
 * @property {string} alignment Cell content alignment (enum: left, center, right) (default: left).
 * @property {number} width Column width (default: auto).
 * @property {number} truncate Number of characters are which the content will be truncated (default: Infinity).
 * @property {boolean} wrapWord When true the text is broken at the nearest space or one of the special characters
 * @property {number} paddingLeft Cell content padding width left (default: 1).
 * @property {number} paddingRight Cell content padding width right (default: 1).
 */

/**
 * @typedef {Object} table~border
 * @property {string} topBody
 * @property {string} topJoin
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} bottomBody
 * @property {string} bottomJoin
 * @property {string} bottomLeft
 * @property {string} bottomRight
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 * @property {string} joinBody
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinJoin
 */

/**
 * Used to tell whether to draw a horizontal line.
 * This callback is called for each non-content line of the table.
 * The default behavior is to always return true.
 *
 * @typedef {Function} drawHorizontalLine
 * @param {number} index
 * @param {number} size
 * @returns {boolean}
 */

/**
 * @typedef {Object} table~config
 * @property {table~border} border
 * @property {table~columns[]} columns Column specific configuration.
 * @property {table~columns} columnDefault Default values for all columns. Column specific settings overwrite the default values.
 * @property {table~drawHorizontalLine} drawHorizontalLine
 * @property {table~singleLine} singleLine Horizontal lines inside the table are not drawn.
 */

/**
 * Generates a text table.
 *
 * @param {table~row[]} data
 * @param {table~config} userConfig
 * @returns {string}
 */
const table = (data, userConfig = {}) => {
  let rows;
  (0, _validateTableData.default)(data);
  rows = (0, _stringifyTableData.default)(data);
  const config = (0, _makeConfig.default)(rows, userConfig);
  rows = (0, _truncateTableData.default)(data, config);
  const rowHeightIndex = (0, _calculateRowHeightIndex.default)(rows, config);
  rows = (0, _mapDataUsingRowHeightIndex.default)(rows, rowHeightIndex, config);
  rows = (0, _alignTableData.default)(rows, config);
  rows = (0, _padTableData.default)(rows, config);
  const cellWidthIndex = (0, _calculateCellWidthIndex.default)(rows[0]);
  return (0, _drawTable.default)(rows, config.border, cellWidthIndex, rowHeightIndex, config.drawHorizontalLine, config.singleLine);
};

var _default = table;
exports.default = _default;
//# sourceMappingURL=table.js.map