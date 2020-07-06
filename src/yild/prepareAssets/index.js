import fs from 'fs-extra';
import path from 'path';
import { initAction } from '../core';

/**
 * Prepares the assets directory.
 */
const prepareAssets = async() => {
  const [boundLog, , inPath, outPath] = initAction('prepareAssets', [
    ['paths', 'rawAssetPath'], ['paths', 'assetPath'],
  ]);
  boundLog('Processing assets from config...', 'info');

  boundLog(`Copying static assets from ${path.resolve(inPath)} to ${path.resolve(outPath)}`, 'info');
  fs.ensureDirSync(outPath);
  await fs.copy(inPath, outPath);
  boundLog('Static assets have been copied', 'success');

  return;
};

export default prepareAssets;
