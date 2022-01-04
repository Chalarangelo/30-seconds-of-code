import { Env } from 'blocks/utilities/env';
import { Extractor } from 'blocks/utilities/extractor';
import { Logger } from 'blocks/utilities/logger';
import { SitemapWriter } from 'blocks/writers/sitemap';
import { FeedWriter } from 'blocks/writers/feed';
import { IconWriter } from 'blocks/writers/icon';
import { ManifestWriter } from 'blocks/writers/manifest';
import { ChirpWriter } from 'blocks/writers/chirp';
import { AssetWriter } from 'blocks/writers/asset';
import { PageWriter } from 'blocks/writers/page';
import { SearchIndexWriter } from 'blocks/writers/searchIndex';

export const build = async () => {
  Logger.log('Build process is starting up...\n');
  Logger.logProcessInfo();

  await Promise.all([
    Extractor.extract().then(parsed => Env.init(parsed)),
    IconWriter.write(),
    ManifestWriter.write(),
  ]);

  await Promise.all([
    AssetWriter.write(),
    SearchIndexWriter.write(),
    PageWriter.write(),
    SitemapWriter.write(),
    FeedWriter.write(),
    ChirpWriter.write(),
  ]);
};

build();
