import _ from 'lodash';
import getBorderCharacters from './getBorderCharacters';
import validateConfig from './validateConfig';
import calculateMaximumColumnWidthIndex from './calculateMaximumColumnWidthIndex';

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {Object} border
 * @returns {Object}
 */
const makeBorder = (border = {}) => {
  return Object.assign({}, getBorderCharacters('honeywell'), border);
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} columns
 * @param {Object} columnDefault
 * @returns {Object}
 */
const makeColumns = (rows, columns = {}, columnDefault = {}) => {
  const maximumColumnWidthIndex = calculateMaximumColumnWidthIndex(rows);

  _.times(rows[0].length, (index) => {
    if (_.isUndefined(columns[index])) {
      columns[index] = {};
    }

    columns[index] = Object.assign({
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Infinity,
      width: maximumColumnWidthIndex[index],
      wrapWord: false
    }, columnDefault, columns[index]);
  });

  return columns;
};

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} userConfig
 * @returns {Object}
 */
export default (rows, userConfig = {}) => {
  validateConfig('config.json', userConfig);

  const config = _.cloneDeep(userConfig);

  config.border = makeBorder(config.border);
  config.columns = makeColumns(rows, config.columns, config.columnDefault);

  if (!config.drawHorizontalLine) {
    /**
         * @returns {boolean}
         */
    config.drawHorizontalLine = () => {
      return true;
    };
  }

  if (config.singleLine === undefined) {
    config.singleLine = false;
  }

  return config;
};
