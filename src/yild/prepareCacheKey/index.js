import fs from 'fs-extra';
import path from 'path';
import { initAction } from '../core';

/**
 * Generates the cache key file.
 */
const prepareCacheKey = async() => {
  const [boundLog, _, outPath] = initAction('prepareCacheKey', [['paths', 'buildPath']]);
  boundLog('Generating cache key file...', 'info');

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

export default prepareCacheKey;
