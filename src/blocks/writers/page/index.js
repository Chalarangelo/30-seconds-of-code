import pathSettings from 'settings/paths';
import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';

export class PageWriter {
  static write({ outPath = `${pathSettings.contentPath}/pages` } = {}) {
    const boundLog = Logger.bind('writers.page.write');

    let PageSerializer = Env.schema.getSerializer('PageSerializer');
    let pages = Env.schema.getModel('Page').records;
    if (process.env.NODE_ENV === 'production') pages = pages.published;
    boundLog(`Generating JSON files for ${pages.length} pages`, 'info');

    // TODO: Second pass here, decide on some things
    const staticData = PageSerializer.serializeArray(pages.static.toArray());
    const listingData = PageSerializer.serializeRecordSet(
      pages.listing,
      {},
      // Maybe prefix with a `/`? We'll see
      (key, value) => value.relRoute.slice(1)
    );
    const snippetData = PageSerializer.serializeRecordSet(
      pages.snippets,
      {},
      // Maybe prefix with a `/`? We'll see
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
      ...staticData.map(page => {
        // Remove leading slash, but we'll see
        const fileName = page.relRoute.slice(1);
        return JSONHandler.toFile(`${outPath}/${fileName}.json`, page);
      }),
      // Listing pages
      JSONHandler.toFile(`${outPath}/[lang]/[...listing].json`, listingData),
      // Snippet pages
      JSONHandler.toFile(`${outPath}/[lang]/s/[snippet].json`, snippetData),
    ]);
  }
}
