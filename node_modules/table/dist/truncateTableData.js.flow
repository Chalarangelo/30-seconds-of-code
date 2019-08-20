import _ from 'lodash';

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
export default (rows, config) => {
  return rows.map((cells) => {
    return cells.map((content, index) => {
      return _.truncate(content, {
        length: config.columns[index].truncate
      });
    });
  });
};
