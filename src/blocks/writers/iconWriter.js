import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import webfontsGenerator from 'webfonts-generator';
import { Application } from 'blocks/application';

const { Logger, JSONHandler } = Application;

const inPath = 'src/icons/*.svg';
const iconConfigPath = 'content/configs/icons.json';

const defaultConfig = {
  dest: Application.settings.paths.rawAssetPath,
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
    langSelectors: ['.card-icon', '.btn'],
    chipSelector: '.collection-chip',
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
    const fileList = glob.sync(inPath);
    const icons = JSONHandler.fromFile(iconConfigPath).icons;

    const logger = new Logger('IconWriter.write');
    logger.log(
      `Generating icon font and styles from ${fileList.length} files...`
    );

    const config = {
      ...defaultConfig,
      files: fileList,
      templateOptions: {
        ...defaultConfig.templateOptions,
        langIcons: icons,
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
