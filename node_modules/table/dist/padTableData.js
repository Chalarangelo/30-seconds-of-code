"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
const padTableData = (rows, config) => {
  return rows.map(cells => {
    return cells.map((value, index1) => {
      const column = config.columns[index1];
      return ' '.repeat(column.paddingLeft) + value + ' '.repeat(column.paddingRight);
    });
  });
};

var _default = padTableData;
exports.default = _default;
//# sourceMappingURL=padTableData.js.map