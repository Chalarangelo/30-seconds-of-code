import pathSettings from 'settings/paths';
import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';

export class SearchIndexWriter {
  static async write({ publicPath = pathSettings.publicPath } = {}) {
    const logger = new Logger('SearchIndexWriter.write');

    let searchIndex = Env.schema.getModel('Page').records.search.first.context
      .searchIndex;
    logger.log(`Writing search index for ${searchIndex.length} items`);

    await JSONHandler.toFile(`${publicPath}/search-data.json`, {
      searchIndex,
    });

    logger.success('Writing search index complete');
  }
}
