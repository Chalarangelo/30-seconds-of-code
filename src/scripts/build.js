import { loadContentConfigs } from 'build/config';
import { Content } from 'build/utilities/content';
import { makeIcons, prepareAssets } from 'build/assets';
import { generateSitemap } from 'build/sitemap';
import { extractData } from 'build/extract';
import globalConfig from 'config/global';
import pathConfig from 'config/paths';
import iconConfig from 'config/icons';
import sitemapConfig from 'config/sitemap';
import { Logger } from 'build/utilities/logger';

export const build = async() => {
  global.yild = global.yild || {};
  global.yild.paths = pathConfig;
  global.yild.icons = iconConfig;
  global.yild.sitemap = sitemapConfig;
  global.yild.mainConfig = globalConfig;
  global.yild.env = 'PRODUCTION';

  Logger.log(`${Logger.format('yild', 'bold')} is starting up...`, 'info');
  Logger.logProcessInfo();
  Logger.breakLine();
  loadContentConfigs(pathConfig.rawContentPath, Logger.log);

  await Promise.all([
    Content.update(),
    makeIcons(),
  ]);

  await Promise.all([
    extractData(),
    prepareAssets(),
  ]);

  await Promise.all([
    generateSitemap(),
  ]);
};

build();
