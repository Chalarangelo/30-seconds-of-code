import { Application } from 'blocks/application';

const { Logger, JSONHandler } = Application;

const outPath = `${Application.settings.paths.publicPath}/search-data.json`;

/**
 * Writes the search index file (search-data.json).
 */
export class SearchIndexWriter {
  /**
   * Writes the search index file (search-data.json).
   * @returns {Promise} A promise that will resolve when the search index file
   * has been written to disk.
   */
  static async write() {
    const logger = new Logger('SearchIndexWriter.write');

    let SearchResultSerializer = Application.dataset.getSerializer(
      'SearchResultSerializer'
    );

    const snippets = Application.dataset.getModel('Snippet').records.listed;

    const snippetsData = SearchResultSerializer.serializeArray(
      snippets.toArray(),
      { type: 'snippet' }
    );

    const collections =
      Application.dataset.getModel('Collection').records.listed;

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
