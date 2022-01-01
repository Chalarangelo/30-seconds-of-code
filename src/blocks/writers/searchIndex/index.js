import pathSettings from 'settings/paths';
import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';

export class SearchIndexWriter {
  static async write({ publicPath = pathSettings.publicPath } = {}) {
    const boundLog = Logger.bind('writers.searchIndex.write');

    let searchIndex = Env.schema.getModel('Page').records.search.first.context
      .searchIndex;
    boundLog(`Writing search index for ${searchIndex.length} items`, 'info');

    await JSONHandler.toFile(`${publicPath}/search-data.json`, {
      searchIndex,
    });

    boundLog('Writing search index complete', 'success');
  }
}
