import util from 'util';
import fs from 'fs-extra';
import handlebars from 'handlebars';
import { Requirements } from 'blocks/utilities/requirements';
import { Logger } from 'blocks/utilities/logger';

const writeFile = util.promisify(fs.writeFile);

/**
 * Serializes sitemap.xml files.
 */
export class SitemapSerializer {
  /**
   * Generates the website's sitemap from the JSON files of the pages.
   * @param {object} options - An options object, containing the following:
   *  - `sitemapFileName`: Name of the sitemap XML file.
   *  - `xmlPath`: Path for the generated XML file.
   *  - `websiteUrl`: Root URL of the website.
   *
   * All `options` values default to values from `global.settings`.
   * @returns {Promise} A promise that will resolve when the sitemap has been written to disk.
   */
  static serialize = async ({
    sitemapFileName = global.settings.sitemap.sitemapFileName,
    sitemapTemplatePath = global.settings.sitemap.sitemapTemplatePath,
    xmlPath = global.settings.paths.xmlPath,
    websiteUrl = global.settings.websiteUrl,
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

    await writeFile(`${xmlPath}/${sitemapFileName}`, sitemap);

    boundLog('Generating sitemap complete', 'success');
  };
}
