import { Application } from 'blocks/application';
import { Logger } from 'blocks/utilities/logger';
import { IconWriter } from 'blocks/writers/iconWriter';
import { AssetWriter } from 'blocks/writers/assetWriter';
import { PageWriter } from 'blocks/writers/pageWriter';
import { SearchIndexWriter } from 'blocks/writers/searchIndexWriter';

export const build = async () => {
  Logger.log('Build process is starting up...\n');
  Logger.logProcessInfo();

  await Promise.all([Application.extractAndInitialize(), IconWriter.write()]);

  await Promise.all([
    SearchIndexWriter.write(),
    AssetWriter.write(),
    PageWriter.write(),
  ]);
};

build();
