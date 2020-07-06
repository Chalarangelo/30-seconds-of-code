import fs from 'fs-extra';
import path from 'path';
import { hasKeys } from 'utils';
import logger, { format } from '../logOutput';

const VALID_PARAM_VALUES = ['PRODUCTION', 'DEVELOPMENT'];

const generateEnvironmentConfig = async(envMode, outPath, boundLog) => {
  boundLog(`Writing environment configuration file to ${path.resolve(outPath, 'env.js')}`, 'info');

  const fileData = [
    `const env = '${envMode}';`,
    'export default env;',
  ].join('\n');

  fs.ensureDirSync(outPath);
  await fs.writeFile(path.resolve(outPath, 'env.js'), fileData);

  boundLog('Environment configuration file generated', 'success');
  return;
};

const prepareEnv = async param => {
  const boundLog = logger.bindProcessLogger('prepareEnv');
  if(typeof global._coeus_instance === 'undefined' || typeof global._coeus_instance.config === 'undefined')
    return logger.log('Fatal error: coeus instance or config not found. Exiting...', 'error');

  const config = global._coeus_instance.config;
  boundLog('Generating environment configuration file...', 'info');

  if (VALID_PARAM_VALUES.includes(param) && hasKeys(config.paths, ['buildPath']))
    await generateEnvironmentConfig(param, config.paths.buildPath, boundLog);
  else {
    boundLog(`Parameter value ${format(param, 'bold')} is invalid, defaulting to ${format(VALID_PARAM_VALUES[0], 'bold')}`, 'warning');
    await generateEnvironmentConfig(VALID_PARAM_VALUES[0], config.paths.buildPath, boundLog);
  }

};

export default prepareEnv;
