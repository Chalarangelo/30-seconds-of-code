import {
  drawBorderTop,
  drawBorderJoin,
  drawBorderBottom
} from './drawBorder';
import drawRow from './drawRow';

/**
 * @param {Array} rows
 * @param {Object} border
 * @param {Array} columnSizeIndex
 * @param {Array} rowSpanIndex
 * @param {Function} drawHorizontalLine
 * @param {boolean} singleLine
 * @returns {string}
 */
export default (rows, border, columnSizeIndex, rowSpanIndex, drawHorizontalLine, singleLine) => {
  let output;
  let realRowIndex;
  let rowHeight;

  const rowCount = rows.length;

  realRowIndex = 0;

  output = '';

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += drawBorderTop(columnSizeIndex, border);
  }

  rows.forEach((row, index0) => {
    output += drawRow(row, border);

    if (!rowHeight) {
      rowHeight = rowSpanIndex[realRowIndex];

      realRowIndex++;
    }

    rowHeight--;

    if (!singleLine && rowHeight === 0 && index0 !== rowCount - 1 && drawHorizontalLine(realRowIndex, rowCount)) {
      output += drawBorderJoin(columnSizeIndex, border);
    }
  });

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += drawBorderBottom(columnSizeIndex, border);
  }

  return output;
};
