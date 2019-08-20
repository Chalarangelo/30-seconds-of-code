import drawTable from './drawTable';
import calculateCellWidthIndex from './calculateCellWidthIndex';
import makeConfig from './makeConfig';
import calculateRowHeightIndex from './calculateRowHeightIndex';
import mapDataUsingRowHeightIndex from './mapDataUsingRowHeightIndex';
import alignTableData from './alignTableData';
import padTableData from './padTableData';
import validateTableData from './validateTableData';
import stringifyTableData from './stringifyTableData';
import truncateTableData from './truncateTableData';

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
export default (data, userConfig = {}) => {
  let rows;

  validateTableData(data);

  rows = stringifyTableData(data);

  const config = makeConfig(rows, userConfig);

  rows = truncateTableData(data, config);

  const rowHeightIndex = calculateRowHeightIndex(rows, config);

  rows = mapDataUsingRowHeightIndex(rows, rowHeightIndex, config);
  rows = alignTableData(rows, config);
  rows = padTableData(rows, config);

  const cellWidthIndex = calculateCellWidthIndex(rows[0]);

  return drawTable(rows, config.border, cellWidthIndex, rowHeightIndex, config.drawHorizontalLine, config.singleLine);
};
