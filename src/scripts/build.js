import { setupEnv } from 'build/utilities/env';
import { Logger } from 'build/utilities/logger';
import { Content } from 'build/utilities/content';
import { IconSerializer } from 'build/serializers/icon';
import { SitemapSerializer } from 'build/serializers/sitemap';
import { FileParser } from 'build/parsers/file';
import { AssetSerializer } from 'build/serializers/asset';
import { Extractor } from 'build/utilities/extractor';

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

  await Promise.all([Extractor.extract(), AssetSerializer.serialize()]);

  await Promise.all([SitemapSerializer.serialize()]);
};

build();
