import stringWidth from 'string-width';

/**
 * Calculates width of each cell contents.
 *
 * @param {string[]} cells
 * @returns {number[]}
 */
export default (cells) => {
  return cells.map((value) => {
    return Math.max(
      ...value.split('\n').map((line) => {
        return stringWidth(line);
      })
    );
  });
};
