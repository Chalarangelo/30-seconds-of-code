import path from 'path';
import glob from 'glob';
import logger from '../logOutput';
import { hasKeys, get } from 'utils';

/**
 * Initializes a yild action.
 * @param {string} actionName - The name of the action.
 * @param {array} requiredKeys - A 2D array of required keys.
 * @returns {array} - An array of the form [boundLog, config, requiredKeyValues]
 */
export const initAction = (actionName, requiredKeys = []) => {
  const boundLog = logger.bindProcessLogger(actionName);
  if (typeof global._yild_instance === 'undefined' ||
      typeof global._yild_instance.config === 'undefined') {
    logger.log(
      'Fatal error: yild instance or config not found. Exiting...',
      'error'
    );
    return process.exit(1);
  }

  const config = global._yild_instance.config;
  if (requiredKeys.length && !hasKeys(config, requiredKeys)) {
    logger.log(
      'Fatal error: one or more keys in the following list are not present:',
      'error'
    );
    logger.log(
      requiredKeys.map(k => Array.isArray(k) ? k.join('.') : k).join(', '),
      'error'
    );
    return process.exit(1);
  }

  return [boundLog, config, ...get(config, requiredKeys)];
};

/**
 * Loads the content configuration files. Will use stored ones, if they exist.
 * @param {string} inPath - Name of the directory where the configs are located.
 * @param {logger} boundLog - A bound logger.log function.
 * @returns {array} - An array of content configs;
 */
export const loadContentConfigs = (inPath, boundLog) => {
  boundLog(`Loading individual configuration files in ${path.resolve(inPath, 'configs')}`, 'info');
  let configs = [];
  if(global._yild_instance.contentConfigs) {
    configs = global._yild_instance.contentConfigs;
    boundLog(`Using already loaded configuration files`, 'success');
  } else {
    glob.sync(`${inPath}/configs/*.json`)
      .forEach( file => {
        configs.push(
          require( path.resolve( file ) )
        );
      });
    global._yild_instance.contentConfigs = configs;
    boundLog(`Loaded ${configs.length} configuration files`, 'success');
  }
  return configs;
};

export { helpFlag } from './actions';
export { default as actions } from './actions';
