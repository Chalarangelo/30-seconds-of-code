import _ from 'lodash';
import makeStreamConfig from './makeStreamConfig';
import drawRow from './drawRow';
import {
  drawBorderBottom,
  drawBorderJoin,
  drawBorderTop
} from './drawBorder';
import stringifyTableData from './stringifyTableData';
import truncateTableData from './truncateTableData';
import mapDataUsingRowHeightIndex from './mapDataUsingRowHeightIndex';
import alignTableData from './alignTableData';
import padTableData from './padTableData';
import calculateRowHeightIndex from './calculateRowHeightIndex';

/**
 * @param {Array} data
 * @param {Object} config
 * @returns {Array}
 */
const prepareData = (data, config) => {
  let rows;

  rows = stringifyTableData(data);

  rows = truncateTableData(data, config);

  const rowHeightIndex = calculateRowHeightIndex(rows, config);

  rows = mapDataUsingRowHeightIndex(rows, rowHeightIndex, config);
  rows = alignTableData(rows, config);
  rows = padTableData(rows, config);

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

  const body = rows.map((literalRow) => {
    return drawRow(literalRow, config.border);
  }).join('');

  let output;

  output = '';

  output += drawBorderTop(columnWidthIndex, config.border);
  output += body;
  output += drawBorderBottom(columnWidthIndex, config.border);

  output = _.trimEnd(output);

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

  const body = rows.map((literalRow) => {
    return drawRow(literalRow, config.border);
  }).join('');

  let output = '';
  const bottom = drawBorderBottom(columnWidthIndex, config.border);

  if (bottom !== '\n') {
    output = '\r\u001B[K';
  }

  output += drawBorderJoin(columnWidthIndex, config.border);
  output += body;
  output += bottom;

  output = _.trimEnd(output);

  process.stdout.write(output);
};

/**
 * @param {Object} userConfig
 * @returns {Object}
 */
export default (userConfig = {}) => {
  const config = makeStreamConfig(userConfig);

  // @todo Use 'Object.values' when Node.js v6 support is dropped.
  const columnWidthIndex = _.values(_.mapValues(config.columns, (column) => {
    return column.width + column.paddingLeft + column.paddingRight;
  }));

  let empty;

  empty = true;

  return {
    /**
     * @param {string[]} row
     * @returns {undefined}
     */
    write: (row) => {
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
