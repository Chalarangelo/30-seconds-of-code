/**
 * @typedef {Object} drawRow~border
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 */

/**
 * @param {number[]} columns
 * @param {drawRow~border} border
 * @returns {string}
 */
export default (columns, border) => {
  return border.bodyLeft + columns.join(border.bodyJoin) + border.bodyRight + '\n';
};
