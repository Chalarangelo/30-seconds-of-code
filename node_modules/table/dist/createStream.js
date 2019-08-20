"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _makeStreamConfig = _interopRequireDefault(require("./makeStreamConfig"));

var _drawRow = _interopRequireDefault(require("./drawRow"));

var _drawBorder = require("./drawBorder");

var _stringifyTableData = _interopRequireDefault(require("./stringifyTableData"));

var _truncateTableData = _interopRequireDefault(require("./truncateTableData"));

var _mapDataUsingRowHeightIndex = _interopRequireDefault(require("./mapDataUsingRowHeightIndex"));

var _alignTableData = _interopRequireDefault(require("./alignTableData"));

var _padTableData = _interopRequireDefault(require("./padTableData"));

var _calculateRowHeightIndex = _interopRequireDefault(require("./calculateRowHeightIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Array} data
 * @param {Object} config
 * @returns {Array}
 */
const prepareData = (data, config) => {
  let rows;
  rows = (0, _stringifyTableData.default)(data);
  rows = (0, _truncateTableData.default)(data, config);
  const rowHeightIndex = (0, _calculateRowHeightIndex.default)(rows, config);
  rows = (0, _mapDataUsingRowHeightIndex.default)(rows, rowHeightIndex, config);
  rows = (0, _alignTableData.default)(rows, config);
  rows = (0, _padTableData.default)(rows, config);
  return rows;
};
/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */


const create = (row, columnWidthIndex, config) => {
  const rows = prepareData([row], config);
  const body = rows.map(literalRow => {
    return (0, _drawRow.default)(literalRow, config.border);
  }).join('');
  let output;
  output = '';
  output += (0, _drawBorder.drawBorderTop)(columnWidthIndex, config.border);
  output += body;
  output += (0, _drawBorder.drawBorderBottom)(columnWidthIndex, config.border);
  output = (0, _trimEnd2.default)(output);
  process.stdout.write(output);
};
/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */


const append = (row, columnWidthIndex, config) => {
  const rows = prepareData([row], config);
  const body = rows.map(literalRow => {
    return (0, _drawRow.default)(literalRow, config.border);
  }).join('');
  let output = '';
  const bottom = (0, _drawBorder.drawBorderBottom)(columnWidthIndex, config.border);

  if (bottom !== '\n') {
    output = '\r\u001B[K';
  }

  output += (0, _drawBorder.drawBorderJoin)(columnWidthIndex, config.border);
  output += body;
  output += bottom;
  output = (0, _trimEnd2.default)(output);
  process.stdout.write(output);
};
/**
 * @param {Object} userConfig
 * @returns {Object}
 */


const createStream = (userConfig = {}) => {
  const config = (0, _makeStreamConfig.default)(userConfig); // @todo Use 'Object.values' when Node.js v6 support is dropped.

  const columnWidthIndex = (0, _values2.default)((0, _mapValues2.default)(config.columns, column => {
    return column.width + column.paddingLeft + column.paddingRight;
  }));
  let empty;
  empty = true;
  return {
    /**
     * @param {string[]} row
     * @returns {undefined}
     */
    write: row => {
      if (row.length !== config.columnCount) {
        throw new Error('Row cell count does not match the config.columnCount.');
      }

      if (empty) {
        empty = false;
        return create(row, columnWidthIndex, config);
      } else {
        return append(row, columnWidthIndex, config);
      }
    }
  };
};

var _default = createStream;
exports.default = _default;
//# sourceMappingURL=createStream.js.map