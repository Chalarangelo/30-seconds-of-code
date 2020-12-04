import { prepareAssets } from 'build/assets';
import { generateSitemap } from 'build/sitemap';
import { extractData } from 'build/extract';
import { setupEnv } from 'build/utilities/env';
import { Logger } from 'build/utilities/logger';
import { Content } from 'build/utilities/content';
import { IconSerializer } from 'build/serializers/icon';
import { FileParser } from 'build/parsers/file';

export const build = async () => {
  setupEnv('PRODUCTION');

  Logger.log('Build process is starting up...', 'info');
  Logger.logProcessInfo();
  Logger.breakLine();

  await Promise.all([
    Content.update(),
    IconSerializer.serialize(
      FileParser.matchGlob(global.settings.paths.rawIconPath),
      global.settings.configs
    ),
  ]);

  await Promise.all([extractData(), prepareAssets()]);

  await Promise.all([generateSitemap()]);
};

build();
