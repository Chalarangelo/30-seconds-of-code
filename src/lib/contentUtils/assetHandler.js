import fs from 'fs-extra/esm';
import path from 'node:path';
import sharp from 'sharp';
import { globSync } from 'glob';

import {
  contentDir,
  assetPath,
  publicPath,
} from '#src/lib/contentUtils/config.js';

const supportedDirectories = ['splash', 'cover'].join('|');
export const supportedExtensions = [
  'jpeg',
  'jpg',
  'png',
  'webp',
  'tif',
  'tiff',
].join('|');
const inputPath = `${contentDir}/${assetPath}`;
const publicOutputPath = `${publicPath}/${assetPath}`;

const convertedAssetGlobPattern = `${publicOutputPath}/@(${supportedDirectories})/*.webp`;
const unconvertedAssetGlobPattern = `${inputPath}/@(${supportedDirectories})/*.@(${supportedExtensions})`;

const quality = {
  splash: 90,
  cover: 85,
};
const dimensions = {
  splash: [
    { width: 600, height: 600 },
    { width: 400, height: 400 },
  ],
  cover: [
    { width: 800, height: 400 },
    { width: 400, height: 200 },
    { width: 1200, height: 600 },
  ],
};

const staticDirectories = ['icons', 'illustrations'];

export default class AssetHandler {
  static async processAssets({ force = false }) {
    const convertedAssets = [
      ...new Set(
        globSync(convertedAssetGlobPattern).map(asset =>
          asset
            .replace(`${publicOutputPath}/`, '')
            .split('.')[0]
            .replace(/-\d+$/, '')
        )
      ),
    ];

    let unconvertedAssets = globSync(unconvertedAssetGlobPattern).map(
      fileName => {
        const directory = fileName.split('/')[2];
        return {
          filePath: path.resolve(fileName),
          quality: quality[directory],
          dimensions: dimensions[directory],
          fileName: fileName.replace(`${inputPath}/`, '').split('.')[0],
        };
      }
    );

    if (!force && convertedAssets && convertedAssets.length > 0) {
      unconvertedAssets = unconvertedAssets.filter(
        ({ fileName }) => !convertedAssets.includes(fileName)
      );
    }

    await Promise.all([
      ...unconvertedAssets.map(({ filePath, fileName, quality, dimensions }) =>
        Promise.all(
          dimensions.map(({ width, height }) =>
            sharp(filePath)
              .resize({ width, height })
              .webp({ quality })
              .toFile(`${publicOutputPath}/${fileName}-${width}.webp`)
          )
        )
      ),
      ...staticDirectories.map(dir =>
        fs.copy(`${inputPath}/${dir}`, `${publicOutputPath}/${dir}`)
      ),
    ]);
  }
}
