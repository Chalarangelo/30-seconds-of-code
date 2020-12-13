import { setupEnv } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { Content } from 'blocks/utilities/content';
import { IconSerializer } from 'blocks/serializers/icon';
import { SitemapSerializer } from 'blocks/serializers/sitemap';
import { FileParser } from 'blocks/parsers/file';
import { AssetSerializer } from 'blocks/serializers/asset';
import { Extractor } from 'blocks/utilities/extractor';

export const build = async () => {
  setupEnv('PRODUCTION');

  Logger.log('Build process is starting up...', 'info');
  Logger.logProcessInfo();
  Logger.breakLine();

  await Promise.all([
    Content.update(),
    IconSerializer.serialize(
      FileParser.fromGlob(global.settings.paths.rawIconPath),
      global.settings.configs
    ),
  ]);

  await Promise.all([Extractor.extract(), AssetSerializer.serialize()]);

  await Promise.all([SitemapSerializer.serialize()]);
};

build();
