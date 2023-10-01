import fs from 'fs-extra/esm';
import path from 'node:path';
import { globSync } from 'glob';
import webfontsGenerator from 'webfonts-generator';
import pathSettings from '#settings/paths';
import { Logger } from '#blocks/utilities/logger';

const inPath = 'src/icons/*.svg';

const defaultConfig = {
  dest: pathSettings.rawAssetPath,
  types: ['woff2'],
  fontName: 'icons',
  html: false,
  css: true,
  cssDest: 'src/styles/_icons.scss',
  cssFontsUrl: '../../assets/',
  cssTemplate: 'src/templates/iconCssTemplate.hbs',
  templateOptions: {
    baseSelector: '.icon',
    baseClassNames: 'icon',
    classPrefix: 'icon-',
  },
};

/**
 * Writes the icon font file and the related CSS file.
 */
export class IconWriter {
  /**
   * Generates the icon font and CSS stylesheet from the provided icon files.
   * @returns {Promise} A promise that will resolve when the icon font and CSS
   * files have been written to disk.
   */
  static write = () => {
    const fileList = globSync(inPath);

    const logger = new Logger('IconWriter.write');
    logger.log(
      `Generating icon font and styles from ${fileList.length} files...`
    );

    const config = {
      ...defaultConfig,
      files: fileList,
      templateOptions: {
        ...defaultConfig.templateOptions,
      },
    };

    return new Promise((resolve, reject) => {
      webfontsGenerator(config, (error, result) => {
        if (error) reject(error);
        else {
          const fileName = `${config.dest}/${config.fontName}`;
          logger.log(
            `Writing font to ${path.resolve(
              `${fileName}.${defaultConfig.types[0]}`
            )}...`
          );
          ['svg', 'ttf', 'woff'].forEach(suffix =>
            fs.removeSync(`${fileName}.${suffix}`)
          );
          logger.success('Generating icon font and styles complete');
          resolve(result);
        }
      });
    });
  };
}
