"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Casts all cell values to a string.
 *
 * @param {table~row[]} rows
 * @returns {table~row[]}
 */
const stringifyTableData = rows => {
  return rows.map(cells => {
    return cells.map(String);
  });
};

var _default = stringifyTableData;
exports.default = _default;
//# sourceMappingURL=stringifyTableData.js.map