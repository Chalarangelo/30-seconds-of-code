import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import glob from 'glob';
import { initAction, loadContentConfigs } from '../core';

const supportedExtensions = [
  'jpeg', 'jpg', 'png', 'webp', 'tif', 'tiff',
];
const maxWidth = 800;
const outputQuality = 80;

/**
 *
 * @param {string} asset - The filename of the given asset.
 * @param {string} imageDirName - The output directory.
 */
const processImageAsset = (asset, outDir) =>
  new Promise((resolve, reject) => {
    const fileName = asset.slice(asset.lastIndexOf('/'));
    const img = sharp(asset);
    return img
      .metadata()
      .then(metadata => {
        const resizeWidth = Math.min(maxWidth, metadata.width);
        const format = metadata.format;
        return img
          .resize({ width: resizeWidth })
          .toFormat(format, { quality: outputQuality })
          .toFile(
            `${outDir}/${fileName}`,
            (err, info) => {
              if (err) reject(err);
              else resolve(info);
            }
          );
      });
  });

/**
 * Prepares the assets directory.
 */
const prepareAssets = async() => {
  const [boundLog, , inPath, outPath, contentPath, staticAssetPath] = initAction(
    'prepareAssets', [
      ['paths', 'rawAssetPath'], ['paths', 'assetPath'],
      ['paths', 'rawContentPath'], ['paths', 'staticAssetPath'],
    ]
  );
  const configs = loadContentConfigs(contentPath, boundLog);
  boundLog('Processing assets from config...', 'info');

  boundLog(`Copying static assets from ${path.resolve(inPath)} to ${path.resolve(outPath)}`, 'info');
  fs.ensureDirSync(outPath);
  await fs.copy(inPath, outPath);
  boundLog('Static assets have been copied', 'success');

  boundLog(`Processing image assets from configuration files`, 'info');
  for (const cfg of configs) {
    const { images, dirName } = cfg;
    if (images && images.name && images.path) {
      fs.ensureDirSync(path.join(outPath, images.name));
      const assets = glob
        .sync(`${contentPath}/sources/${dirName}/${images.path}/*.@(${supportedExtensions.join('|')})`)
        .map(file => path.resolve(file));
      await Promise.all(assets.map(asset => processImageAsset(asset, `${outPath}/${images.name}`)));
    }
  }
  boundLog(`Processing image assets to from configuration files complete`, 'success');

  boundLog(`Copying assets from ${path.resolve(outPath)} to ${path.resolve('static', staticAssetPath)}`, 'info');
  if(global._yild_instance.env === 'PRODUCTION') {
    fs.ensureDirSync(path.join('static', staticAssetPath));
    fs.copySync(outPath, path.join('static', staticAssetPath));
  }
  boundLog(`Copying assets complete`, 'success');

  return;
};

export default prepareAssets;
