import pathSettings from 'settings/paths';
import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';

export class PageWriter {
  static write({ outPath = `${pathSettings.contentPath}/pages` } = {}) {
    const logger = new Logger('PageWriter.write');

    let PageSerializer = Env.schema.getSerializer('PageSerializer');
    let pages = Env.schema.getModel('Page').records;
    if (process.env.NODE_ENV === 'production') pages = pages.published;
    logger.log(`Generating JSON files for ${pages.length} pages`);

    const staticData = PageSerializer.serializeRecordSet(
      pages.static,
      {},
      (key, value) => value.relRoute.slice(1)
    );
    // This also serializes the `/collections` page, which is also serialized
    // individually. No harm, no foul, but stay vigilant.
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
