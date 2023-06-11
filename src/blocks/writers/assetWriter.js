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
  assetPath: outPath,
} = Application.settings.paths;
const inContentPath = 'content/assets';

// Image asset constants
const supportedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'tif', 'tiff'];
const supportedDirectories = ['splash', 'cover', 'illustrations'];
const coverImageDimensions = { width: 798, height: 399 };
const coverPreviewDimensions = { width: 144, height: 144 };
// Icon asset constants
const dimensions = [32, 180, 192, 512];
const iconOutName = 'icon';

/**
 * Writes assets.
 */
export class AssetWriter {
  static getGeneratedAssets = () =>
    glob
      .sync(`${outPath}/@(${supportedDirectories.join('|')})/*.webp`)
      .map(asset => asset.replace(`${outPath}/`, '').split('.')[0]);

  /**
   * Prepares the assets directory.
   */
  static write = async () => {
    const logger = new Logger('AssetWriter.write');

    logger.log(
      `Processing assets from ${path.resolve(inPath)} to ${path.resolve(
        outPath
      )}`
    );

    // As all directories are known ahead of time, just ensure they exist right away
    fs.ensureDirSync(outPath);
    await Promise.all(
      [
        path.join(outPath, 'splash'),
        path.join(outPath, 'illustrations'),
        path.join(outPath, 'cover'),
        path.join(outPath, 'preview'),
      ].map(dir => fs.ensureDir(dir))
    );

    // Get all generated assets
    const generatedAssets =
      process.env.NODE_ENV !== 'production'
        ? AssetWriter.getGeneratedAssets()
        : null;

    await Promise.all([
      fs.copy(inPath, outPath),
      AssetWriter.processStaticAssets(generatedAssets),
      AssetWriter.processCoverAssets(generatedAssets),
      AssetWriter.processIcons(),
    ]);

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
   * Processes all cover images. Briefly, the steps taken are:
   * - Find all cover images that match the supported extensions.
   * - Filter out images that have already been processed (dev only).
   * - Resize the cover images to the correct dimensions.
   * - Resize the cover images to the correct dimensions for the preview.
   * - Write the cover images as their original format and webp.
   * - Write the cover preview images as their original format and webp.
   * @returns {Promise} A promise that resolves when all cover images have been processed.
   */
  static processCoverAssets = (existingAssets = null) => {
    const logger = new Logger('AssetWriter.processCoverAssets');
    logger.log(`Processing cover images...`);

    let coverAssets = glob
      .sync(`${inContentPath}/cover/*.@(${supportedExtensions.join('|')})`)
      .map(fileName => ({
        filePath: path.resolve(fileName),
        fileName: fileName.slice(
          fileName.lastIndexOf('/'),
          fileName.lastIndexOf('.')
        ),
      }));

    if (existingAssets && existingAssets.length > 0) {
      const originalLength = coverAssets.length;
      logger.log(`Found ${originalLength} cover images.`);

      coverAssets = coverAssets.filter(
        ({ fileName }) => !existingAssets.includes(`cover${fileName}`)
      );

      logger.log(
        `Filtered out ${
          originalLength - coverAssets.length
        } cover images that were already generated.`
      );
    }

    return Promise.all(
      coverAssets.map(
        ({ filePath, fileName }) =>
          new Promise((resolve, reject) => {
            const cover = sharp(filePath).resize(coverImageDimensions);
            const preview = sharp(filePath).resize(coverPreviewDimensions);
            return Promise.all([
              cover
                .jpeg({ quality: 80 })
                .toFile(`${outPath}/cover/${fileName}.jpg`),
              cover
                .webp({ quality: 85 })
                .toFile(`${outPath}/cover/${fileName}.webp`),
              preview
                .jpeg({ quality: 85 })
                .toFile(`${outPath}/preview/${fileName}.jpg`),
              preview
                .webp({ quality: 90 })
                .toFile(`${outPath}/preview/${fileName}.webp`),
            ])
              .then(() => resolve())
              .catch(() => reject());
          })
      )
    ).then(() => logger.success(`Processing cover images complete`));
  };

  static processStaticAssets = (existingAssets = null) => {
    const logger = new Logger('AssetWriter.processStaticAssets');
    logger.log('Processing static assets...');

    let staticAssets = ['splash', 'illustrations'].reduce(
      (allAssets, assetType) => {
        const assets = glob
          .sync(
            `${inContentPath}/${assetType}/*.@(${supportedExtensions.join(
              '|'
            )})`
          )
          .map(fileName => ({
            filePath: path.resolve(fileName),
            fullFileName: fileName.slice(fileName.lastIndexOf('/')),
            fileName: fileName.slice(
              fileName.lastIndexOf('/'),
              fileName.lastIndexOf('.')
            ),
            directory: assetType,
          }));
        return allAssets.concat(assets);
      },
      []
    );

    if (existingAssets && existingAssets.length > 0) {
      const originalLength = staticAssets.length;
      logger.log(`Found ${originalLength} cover images.`);

      staticAssets = staticAssets.filter(
        ({ directory, fileName }) =>
          !existingAssets.includes(`${directory}${fileName}`)
      );

      logger.log(
        `Filtered out ${
          originalLength - staticAssets.length
        } cover images that were already generated.`
      );
    }

    return Promise.all(
      staticAssets.map(
        ({ filePath, fileName, fullFileName, directory }) =>
          new Promise((resolve, reject) => {
            const image = sharp(filePath);
            return Promise.all([
              fs.copy(filePath, `${outPath}/${directory}/${fullFileName}`),
              image
                .webp({ quality: 90 })
                .toFile(`${outPath}/${directory}/${fileName}.webp`),
            ])
              .then(() => resolve())
              .catch(() => reject());
          })
      )
    ).then(() => logger.success(`Processing static assets complete`));
  };

  /**
   * Takes a PNG image and produces all the icon assets necessary for the website.
   * @param {string} iconName The name of the icon to process.
   * @returns {Promise} A promise that resolves when icon assets have been processed.
   */
  static processIcons = (iconName = '30s-icon.png') => {
    const logger = new Logger('AssetWriter.processIcons');
    logger.log('Processing icons...');

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
    }).then(() => logger.success(`Processing icons complete`));
  };
}
