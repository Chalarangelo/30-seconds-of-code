import fs from 'fs-extra';
import { writeFile } from 'fs/promises';
import handlebars from 'handlebars';
import globalSettings from 'settings/global';
import pathSettings from 'settings/paths';
import sitemapSettings from 'settings/sitemap';
import { Requirements } from 'blocks/utilities/requirements';
import { Logger } from 'blocks/utilities/logger';

/**
 * Serializes sitemap.xml files.
 */
export class SitemapSerializer {
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
  static serialize = async ({
    sitemapFileName = sitemapSettings.sitemapFileName,
    sitemapTemplatePath = sitemapSettings.sitemapTemplatePath,
    publicPath = pathSettings.publicPath,
    websiteUrl = globalSettings.websiteUrl,
  } = {}) => {
    const boundLog = Logger.bind('serializers.sitemap.serialize');
    const template = handlebars.compile(
      fs.readFileSync(sitemapTemplatePath, 'utf-8')
    );
    const requirables = Requirements.load().requirables;
    boundLog(`Generating sitemap for ${requirables.length} routes`, 'info');

    const sitemap = template({
      nodes: [
        { fullRoute: websiteUrl, priority: 1.0 },
        ...requirables.filter(n => !n.relRoute.endsWith('404')),
      ],
    });

    await writeFile(`${publicPath}/${sitemapFileName}`, sitemap);

    boundLog('Generating sitemap complete', 'success');
  };
}
