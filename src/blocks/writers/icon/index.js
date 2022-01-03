import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import webfontsGenerator from 'webfonts-generator';
import pathSettings from 'settings/paths';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';

/**
 * Writes icons.
 */
export class IconWriter {
  static iconSettings = {
    types: ['woff2'],
    inPath: 'src/icons/*.svg',
    iconConfigPath: 'content/configs/icons.json',
    cssPath: 'src/styles/_icons.scss',
    fontName: 'icons',
    fontRelativePath: '../../assets/',
    cssTemplatePath: 'src/templates/iconCssTemplate.hbs',
    cssSelector: '.icon',
    cssClassName: 'icon',
    cssClassPrefix: 'icon-',
    cssLanguageSelectors: ['.card-icon', '.btn'],
    cssLanguageChipSelector: '.collection-chip',
  };

  /**
   * Generates the icon font and CSS stylesheet from the provided icon files.
   * @throws Will throw an error if `fileList` or `configs` is not supplied or empty.
   * @returns {Promise} A promise that will resolve when the icon font and CSS files
   *  have been written to disk.
   */
  static write = () => {
    const { rawAssetPath: outPath } = pathSettings;
    const {
      inPath,
      fontName,
      types,
      iconConfigPath,
      cssPath,
      fontRelativePath,
      cssTemplatePath,
      cssSelector,
      cssClassName,
      cssClassPrefix,
      cssLanguageSelectors,
      cssLanguageChipSelector,
    } = IconWriter.iconSettings;
    const fileList = glob.sync(inPath);
    const icons = JSONHandler.fromFile(iconConfigPath).icons;

    const boundLog = Logger.bind('writers.icon.write');
    boundLog(
      `Generating icon font and styles from ${fileList.length} files...`,
      'info'
    );

    const config = {
      files: fileList,
      dest: outPath,
      fontName,
      types,
      html: false,
      css: true,
      cssDest: cssPath,
      cssFontsUrl: fontRelativePath,
      cssTemplate: cssTemplatePath,
      templateOptions: {
        baseSelector: cssSelector,
        baseClassNames: cssClassName,
        classPrefix: cssClassPrefix,
        langSelectors: cssLanguageSelectors,
        chipSelector: cssLanguageChipSelector,
        langIcons: icons,
      },
    };

    return new Promise((resolve, reject) => {
      webfontsGenerator(config, (error, result) => {
        if (error) reject(error);
        else {
          const fileName = `${config.dest}/${config.fontName}`;
          boundLog(
            `Writing font to ${path.resolve(`${fileName}.${types[0]}`)}...`,
            'info'
          );
          ['svg', 'ttf', 'woff'].forEach(suffix =>
            fs.removeSync(`${fileName}.${suffix}`)
          );
          boundLog('Generating icon font and styles complete', 'success');
          resolve(result);
        }
      });
    });
  };
}
