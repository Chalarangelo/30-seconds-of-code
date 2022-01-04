import { Env } from 'blocks/utilities/env';
import { Extractor } from 'blocks/utilities/extractor';
import { Logger } from 'blocks/utilities/logger';
import { IconWriter } from 'blocks/writers/icon';
import { AssetWriter } from 'blocks/writers/asset';
import { PageWriter } from 'blocks/writers/page';
import { SearchIndexWriter } from 'blocks/writers/searchIndex';

export const build = async () => {
  Logger.log('Build process is starting up...\n');
  Logger.logProcessInfo();

  await Promise.all([
    Extractor.extract().then(parsed => Env.init(parsed)),
    IconWriter.write(),
  ]);

  await Promise.all([
    SearchIndexWriter.write(),
    AssetWriter.write(),
    PageWriter.write(),
  ]);
};

build();
