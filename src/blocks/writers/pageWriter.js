import { Application } from 'blocks/application';

const { Logger, JSONHandler } = Application;

const outPath = `${Application.settings.paths.contentPath}/pages`;

/**
 * Writes the JSON files for the pages.
 */
export class PageWriter {
  /**
   * Generates the JSON files for the pages.
   * @returns {Promise} A promise that will resolve when all JSON files have
   * been written to disk.
   */
  static write() {
    const logger = new Logger('PageWriter.write');

    let PageSerializer = Application.dataset.getSerializer('PageSerializer');

    let snippetPages = Application.dataset.getModel('SnippetPage').records;
    if (process.env.NODE_ENV === 'production')
      snippetPages = snippetPages.published;
    const snippetData = PageSerializer.serializeRecordSet(
      snippetPages,
      { withParams: true },
      key => `${key.split('$')[1]}`
    );

    let collectionPages =
      Application.dataset.getModel('CollectionPage').records;
    const collectionData = PageSerializer.serializeRecordSet(
      collectionPages,
      { withParams: true },
      key => `${key.split('$')[1]}`
    );

    let collectionsPages =
      Application.dataset.getModel('CollectionsPage').records;

    const collectionsData = PageSerializer.serializeRecordSet(
      collectionsPages,
      { withParams: true },
      key => `${key.split('$')[1]}`
    );

    const homePage = Application.dataset.getModel('HomePage').records.first;
    const homeData = PageSerializer.serialize(homePage);

    const totalPages =
      snippetPages.length +
      collectionPages.length +
      collectionsPages.length +
      1;
    logger.log(`Generating JSON files for ${totalPages} pages`);

    return Promise.all([
      // Home page
      JSONHandler.toFile(`${outPath}/index.json`, { ...homeData }),
      // Collection pages
      JSONHandler.toFile(`${outPath}/[lang]/[...listing].json`, {
        ...collectionData,
        ...collectionsData,
      }),
      // Snippet pages
      JSONHandler.toFile(`${outPath}/[lang]/s/[snippet].json`, snippetData),
    ]).then(() => {
      logger.success('Finished generating page JSON files');
    });
  }
}
