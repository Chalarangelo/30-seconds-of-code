import fs from 'fs-extra';
import path from 'path';
import { hasKeys } from 'utils';
import logger, { format } from '../logOutput';

const generateEnvironmentConfig = async(outPath, boundLog) => {
  boundLog(`Writing cache key file to ${path.resolve(outPath, 'cacheKey.js')}`, 'info');

  const fileData = [
    `const cacheKey = '${+new Date()}';`,
    'export default cacheKey;',
  ].join('\n');

  fs.ensureDirSync(outPath);
  await fs.writeFile(path.resolve(outPath, 'cacheKey.js'), fileData);

  boundLog('Cache key file generated', 'success');
  return;
};

const prepareCacheKey = async() => {
  const boundLog = logger.bindProcessLogger('prepareCacheKey');
  if(typeof global._coeus_instance === 'undefined' || typeof global._coeus_instance.config === 'undefined')
    return logger.log('Fatal error: coeus instance or config not found. Exiting...', 'error');

  const config = global._coeus_instance.config;
  boundLog('Generating cache key file...', 'info');

  if (hasKeys(config.paths, ['buildPath']))
    await generateEnvironmentConfig(config.paths.buildPath, boundLog);

};

export default prepareCacheKey;
