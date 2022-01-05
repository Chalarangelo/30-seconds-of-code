import fs from 'fs-extra';
import { writeFile } from 'fs/promises';
import handlebars from 'handlebars';
import { Application } from 'blocks/application';

const { Logger } = Application;

const outPath = `${Application.settings.paths.publicPath}/sitemap.xml`;
const templatePath = 'src/templates/sitemapTemplate.hbs';

/**
 * Writes the sitemap.xml file.
 */
export class SitemapWriter {
  /**
   * Generates the website's sitemap from the JSON files of the pages.
   * @returns {Promise} A promise that will resolve when the sitemap has been
   * written to disk.
   */
  static write = async () => {
    const logger = new Logger('SitemapWriter.write');
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));
    const pages = Application.dataset.getModel('Page').records.indexable;

    logger.log(`Generating sitemap for ${pages.length} routes`);
    const sitemap = template({
      nodes: pages.flatSelect('fullRoute', 'priority'),
    });

    await writeFile(outPath, sitemap);
    logger.success('Generating sitemap complete');
  };
}
