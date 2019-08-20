// eslint-disable-next-line import/default
import validateConfig from '../dist/validateConfig';
// eslint-disable-next-line import/default
import validateStreamConfig from '../dist/validateStreamConfig';

const validate = {
  'config.json': validateConfig,
  'streamConfig.json': validateStreamConfig
};

/**
 * @param {string} schemaId
 * @param {formatData~config} config
 * @returns {undefined}
 */
export default (schemaId, config = {}) => {
  if (!validate[schemaId](config)) {
    const errors = validate[schemaId].errors.map((error) => {
      return {
        dataPath: error.dataPath,
        message: error.message,
        params: error.params,
        schemaPath: error.schemaPath
      };
    });

    /* eslint-disable no-console */
    console.log('config', config);
    console.log('errors', errors);
    /* eslint-enable no-console */

    throw new Error('Invalid config.');
  }
};
