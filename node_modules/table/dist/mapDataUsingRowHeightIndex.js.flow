import _ from 'lodash';
import wrapCell from './wrapCell';

/**
 * @param {Array} unmappedRows
 * @param {number[]} rowHeightIndex
 * @param {Object} config
 * @returns {Array}
 */
export default (unmappedRows, rowHeightIndex, config) => {
  const tableWidth = unmappedRows[0].length;

  const mappedRows = unmappedRows.map((cells, index0) => {
    const rowHeight = _.times(rowHeightIndex[index0], () => {
      return new Array(tableWidth).fill('');
    });

    // rowHeight
    //     [{row index within rowSaw; index2}]
    //     [{cell index within a virtual row; index1}]

    cells.forEach((value, index1) => {
      const cellLines = wrapCell(value, config.columns[index1].width, config.columns[index1].wrapWord);

      cellLines.forEach((cellLine, index2) => {
        rowHeight[index2][index1] = cellLine;
      });
    });

    return rowHeight;
  });

  return _.flatten(mappedRows);
};
