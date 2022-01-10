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
    let pages = Application.dataset.getModel('Page').records;
    if (process.env.NODE_ENV === 'production') pages = pages.published;
    logger.log(`Generating JSON files for ${pages.length} pages`);

    const staticData = PageSerializer.serializeRecordSet(
      pages.static,
      {},
      (key, value) => value.relRoute.slice(1)
    );
    const listingData = PageSerializer.serializeRecordSet(
      pages.listing,
      { withParams: true },
      (key, value) => value.relRoute.slice(1)
    );
    const snippetData = PageSerializer.serializeRecordSet(
      pages.snippets,
      { withParams: true },
      key => `${key.split('_')[1]}`
    );

    return Promise.all([
      // Home page
      JSONHandler.toFile(
        `${outPath}/index.json`,
        PageSerializer.serialize(pages.home.first)
      ),
      // Collections page
      JSONHandler.toFile(
        `${outPath}/collections.json`,
        PageSerializer.serialize(pages.collections.first)
      ),
      // Static pages
      ...Object.entries(staticData).map(([fileName, page]) => {
        return JSONHandler.toFile(`${outPath}/${fileName}.json`, page);
      }),
      // Listing pages
      JSONHandler.toFile(`${outPath}/[lang]/[...listing].json`, listingData),
      // Snippet pages
      JSONHandler.toFile(`${outPath}/[lang]/s/[snippet].json`, snippetData),
    ]).then(() => {
      logger.success('Finished generating page JSON files');
    });
  }
}
