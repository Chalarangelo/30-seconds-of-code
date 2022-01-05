import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import glob from 'glob';
import { Application } from 'blocks/application';

const { Logger } = Application;
const {
  publicPath,
  staticAssetPath,
  rawAssetPath: inPath,
  rawContentAssetPath: inContentPath,
  rawContentPath: contentPath,
  assetPath: outPath,
} = Application.settings.paths;

// Image asset constants
const supportedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'tif', 'tiff'];
const maxWidth = 800;
const outputQuality = 80;
// Icon asset constants
const dimensions = [48, 72, 96, 144, 192, 256, 384, 512];
const iconOutName = 'icon';

/**
 * Writes assets.
 */
export class AssetWriter {
  /**
   * Prepares the assets directory.
   */
  static write = async () => {
    const logger = new Logger('AssetWriter.write');
    const repos = Application.dataset.getModel('Repository').records.withImages;
    logger.log('Processing assets from config...');

    logger.log(
      `Processing static assets from ${path.resolve(inPath)} to ${path.resolve(
        outPath
      )}`
    );
    fs.ensureDirSync(outPath);
    await fs.copy(inPath, outPath);
    await fs.copy(inContentPath, outPath);
    const staticAssets = glob
      .sync(`${inContentPath}/*.@(${supportedExtensions.join('|')})`)
      .map(file => path.resolve(file));
    await Promise.all(
      staticAssets.map(asset => AssetWriter.processImageAsset(asset, outPath))
    );
    logger.success('Processing static assets complete');

    logger.log(`Processing image assets from configuration files`);
    for (const [, repo] of repos) {
      fs.ensureDirSync(path.join(outPath, repo.images.name));
      const assets = glob
        .sync(
          `${contentPath}/sources/${repo.dirName}/${
            repo.images.path
          }/*.@(${supportedExtensions.join('|')})`
        )
        .map(file => path.resolve(file));
      await Promise.all(
        assets.map(asset =>
          AssetWriter.processImageAsset(asset, `${outPath}/${repo.images.name}`)
        )
      );
    }
    logger.success(`Processing image assets from configuration files complete`);

    logger.log('Processing icons...');
    await AssetWriter.processIcons();
    logger.success(`Processing icons complete`);

    logger.log(
      `Copying assets from ${path.resolve(outPath)} to ${path.resolve(
        publicPath,
        staticAssetPath
      )}`
    );
    fs.ensureDirSync(path.join(publicPath, staticAssetPath));
    fs.copySync(outPath, path.join(publicPath, staticAssetPath));
    logger.success(`Copying assets complete`);

    return;
  };

  /**
   * Processes the given image asset, converting it to the correct size and quality.
   * @param {string} asset - The filename of the given asset.
   * @param {string} imageDirName - The output directory.
   * @returns {Promise} A promise that resolves when the file has finished writing to disk.
   */
  static processImageAsset = (asset, outDir) =>
    new Promise((resolve, reject) => {
      const fileName = asset.slice(asset.lastIndexOf('/'));
      const img = sharp(asset);
      return img.metadata().then(metadata => {
        const resizeWidth = Math.min(maxWidth, metadata.width);
        const name = fileName.slice(0, fileName.lastIndexOf('.'));
        const format = metadata.format;
        const resized = img.resize({ width: resizeWidth });
        return Promise.all([
          resized
            .toFormat(format, { quality: outputQuality })
            .toFile(`${outDir}/${fileName}`),
          resized
            .webp({ quality: outputQuality })
            .toFile(`${outDir}/${name}.webp`),
        ])
          .then(() => resolve())
          .catch(() => reject());
      });
    });

  /**
   * Meant for manual use only via the console API.
   * Takes a PNG image and produces all the icon assets necessary for the website.
   */
  static processIcons = (iconName = '30s-icon.png') => {
    const iconPath = path.join(inPath, iconName);
    const iconOutPath = path.join(outPath, 'icons');

    fs.ensureDirSync(iconOutPath);

    return new Promise((resolve, reject) => {
      const img = sharp(iconPath);
      return Promise.all([
        img
          .resize({ width: 32 })
          .png()
          .toFile(`${iconOutPath}/favicon-32x32.png`),
        ...dimensions.map(d =>
          img
            .resize({ width: d })
            .png()
            .toFile(`${iconOutPath}/${iconOutName}-${d}x${d}.png`)
        ),
      ])
        .then(() => resolve())
        .catch(() => reject());
    });
  };
}
