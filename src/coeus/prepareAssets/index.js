import fs from 'fs-extra';
import path from 'path';
import { hasKeys } from 'utils';
import logger from '../logOutput';

const prepareStaticAssets = async(inPath, outPath, boundLog) => {
  boundLog(`Copying static assets from ${path.resolve(inPath)} to ${path.resolve(outPath)}`, 'info');

  fs.ensureDirSync(outPath);
  await fs.copy(inPath, outPath);

  boundLog('Static assets have been copied', 'success');
  return;
};

const prepareAssets = async() => {
  const boundLog = logger.bindProcessLogger('prepareAssets');
  if(typeof global._coeus_instance === 'undefined' || typeof global._coeus_instance.config === 'undefined')
    return logger.log('Fatal error: coeus instance or config not found. Exiting...', 'error');

  const config = global._coeus_instance.config;
  boundLog('Processing assets from config...', 'info');

  if (hasKeys(config.paths, ['assetPath', 'rawAssetPath']))
    await prepareStaticAssets(config.paths.rawAssetPath, config.paths.assetPath, boundLog);

};

export default prepareAssets;
