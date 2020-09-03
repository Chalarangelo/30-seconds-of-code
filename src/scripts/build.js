import { logger, format } from 'build/core';
import { loadContentConfigs } from 'build/config';
import { updateContent } from 'build/content';
import { makeIcons, prepareAssets } from 'build/assets';
import { generateSitemap } from 'build/sitemap';
import { extractData } from 'build/extract';
import globalConfig from 'config/global';
import pathConfig from 'config/paths';
import iconConfig from 'config/icons';
import sitemapConfig from 'config/sitemap';

export const build = async() => {
  global.yild = global.yild || {};
  global.yild.paths = pathConfig;
  global.yild.icons = iconConfig;
  global.yild.sitemap = sitemapConfig;
  global.yild.mainConfig = globalConfig;
  global.yild.env = 'PRODUCTION';

  logger.log(`${format('yild', 'bold')} is starting up...`, 'info');
  logger.logProcessInfo();
  logger.breakLine();
  loadContentConfigs(pathConfig.rawContentPath, logger.log);

  await Promise.all([
    updateContent(),
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
