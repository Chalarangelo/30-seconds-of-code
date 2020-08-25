import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import webfontsGenerator from 'webfonts-generator';
import { initAction, loadContentConfigs } from '../core';
import iconConfig from 'config/icons';

const {
  types,
  fontName,
  fontRelativePath,
  cssTemplatePath,
  cssSelector,
  cssClassName,
  cssClassPrefix,
  cssLanguageSelectors,
} = iconConfig;

/**
 * Generate a woff2 fle with the icon font and CSS styles to go with it.
 */
const makeIcons = () => {
  const [boundLog, , inPath, contentPath, outPath, cssPath] = initAction('makeIcons', [
    ['paths', 'rawIconPath'],
    ['paths', 'rawContentPath'],
    ['paths', 'rawAssetPath'],
    ['paths', 'iconFontPath'],
  ]);
  const files = glob.sync(`${inPath}`);
  const configs = loadContentConfigs(contentPath, boundLog);
  boundLog(`Generating icon font and styles from ${files.length} files...`, 'info');

  const config = {
    files,
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
      langIcons: configs
        .map(cfg => cfg.theme)
        .filter(Boolean),
    },
  };

  return new Promise((resolve, reject) => {
    webfontsGenerator(config, (error, result) => {
      if (error) reject(error);
      else {
        const fileName = `${config.dest}/${config.fontName}`;
        boundLog(`Writing font to ${path.resolve(`${fileName}.${types[0]}`)}...`, 'info');
        ['svg', 'ttf', 'woff'].forEach(suffix => fs.removeSync(`${fileName}.${suffix}`));
        boundLog('Generating icon font and styles complete', 'success');
        resolve(result);
      }
    });
  });
};

export default makeIcons;
