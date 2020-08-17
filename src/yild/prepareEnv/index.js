import fs from 'fs-extra';
import path from 'path';
import { initAction } from '../core';
import { format } from '../logOutput';

const VALID_PARAM_VALUES = ['PRODUCTION', 'DEVELOPMENT'];

/**
 * Generates the environment configuration file.
 * @param {string} param - 'DEVELOPMENT' or 'PRODUCTION', used for environment configuration.
 */
const prepareEnv = async param => {
  const [boundLog, , outPath] = initAction('prepareEnv', [['paths', 'buildPath']]);
  boundLog('Generating environment configuration file...', 'info');

  let envMode = VALID_PARAM_VALUES.includes(param) ? param : VALID_PARAM_VALUES[0];
  if(!VALID_PARAM_VALUES.includes(param)) {
    boundLog(
      `Parameter value ${format(param, 'bold')} is invalid, defaulting to ${format(envMode, 'bold')}`,
      'warning'
    );
  } else {
    boundLog(
      `Using parameter value ${format(param, 'bold')}`,
      'info'
    );
  }

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

export default prepareEnv;
