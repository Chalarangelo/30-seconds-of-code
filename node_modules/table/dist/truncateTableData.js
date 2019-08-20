"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _truncate2 = _interopRequireDefault(require("lodash/truncate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
const truncateTableData = (rows, config) => {
  return rows.map(cells => {
    return cells.map((content, index) => {
      return (0, _truncate2.default)(content, {
        length: config.columns[index].truncate
      });
    });
  });
};

var _default = truncateTableData;
exports.default = _default;
//# sourceMappingURL=truncateTableData.js.map