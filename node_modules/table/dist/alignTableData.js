"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stringWidth = _interopRequireDefault(require("string-width"));

var _alignString = _interopRequireDefault(require("./alignString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
const alignTableData = (rows, config) => {
  return rows.map(cells => {
    return cells.map((value, index1) => {
      const column = config.columns[index1];

      if ((0, _stringWidth.default)(value) === column.width) {
        return value;
      } else {
        return (0, _alignString.default)(value, column.width, column.alignment);
      }
    });
  });
};

var _default = alignTableData;
exports.default = _default;
//# sourceMappingURL=alignTableData.js.map