import pathSettings from '#settings/paths';
import { Logger } from '#blocks/utilities/logger';
import { JSONHandler } from '#blocks/utilities/jsonHandler';

const outPath = `${pathSettings.publicPath}/search-data.json`;

/**
 * Writes the search index file (search-data.json).
 */
export class SearchIndexWriter {
  /**
   * Writes the search index file (search-data.json).
   * @param {Application} application The application instance.
   * @returns {Promise} A promise that will resolve when the search index file
   * has been written to disk.
   */
  static async write(application) {
    const logger = new Logger('SearchIndexWriter.write');
    const { dataset } = application;

    let SearchResultSerializer = dataset.getSerializer(
      'SearchResultSerializer'
    );

    const snippets = dataset.getModel('Snippet').records.listed;

    const snippetsData = SearchResultSerializer.serializeArray(
      snippets.toArray(),
      { type: 'snippet' }
    );

    const collections = dataset.getModel('Collection').records.listed;

    const collectionsData = SearchResultSerializer.serializeArray(
      collections.toArray(),
      { type: 'collection' }
    );

    const searchIndex = [...snippetsData, ...collectionsData];
    logger.log(`Writing search index for ${searchIndex.length} items`);

    await JSONHandler.toFile(outPath, { searchIndex });
    logger.success('Writing search index complete');
  }
}
