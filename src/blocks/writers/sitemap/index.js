import fs from 'fs-extra';
import { writeFile } from 'fs/promises';
import handlebars from 'handlebars';
import pathSettings from 'settings/paths';
import sitemapSettings from 'settings/sitemap';
import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';

/**
 * Writes the sitemap.xml file.
 */
export class SitemapWriter {
  /**
   * Generates the website's sitemap from the JSON files of the pages.
   * @param {object} options - An options object, containing the following:
   *  - `sitemapFileName`: Name of the sitemap XML file.
   *  - `publicPath`: Path for the generated XML file.
   *  - `websiteUrl`: Root URL of the website.
   *
   * All `options` values default to values from settings.
   * @returns {Promise} A promise that will resolve when the sitemap has been written to disk.
   */
  static write = async ({
    sitemapFileName = sitemapSettings.sitemapFileName,
    sitemapTemplatePath = sitemapSettings.sitemapTemplatePath,
    publicPath = pathSettings.publicPath,
  } = {}) => {
    const boundLog = Logger.bind('writers.sitemap.write');
    const template = handlebars.compile(
      fs.readFileSync(sitemapTemplatePath, 'utf-8')
    );
    const pages = Env.schema
      .getModel('Page')
      .records.indexable.sort((a, b) => b.priority - a.priority);
    boundLog(`Generating sitemap for ${pages.length} routes`, 'info');

    const sitemap = template({
      nodes: pages.flatSelect('fullRoute', 'priority'),
    });

    await writeFile(`${publicPath}/${sitemapFileName}`, sitemap);

    boundLog('Generating sitemap complete', 'success');
  };
}
