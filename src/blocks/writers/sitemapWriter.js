import fs from 'fs-extra';
import { writeFile } from 'fs/promises';
import handlebars from 'handlebars';
import { Application } from 'blocks/application';

const { Logger } = Application;

const { websiteUrl } = Application.settings;
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
    const snippetPages = Application.dataset
      .getModel('SnippetPage')
      .records.published.flatMap(page => `${websiteUrl}${page.slug}`);
    const collectionPages = Application.dataset
      .getModel('CollectionPage')
      .records.flatMap(page => `${websiteUrl}${page.slug}`);
    const collectionsPages = Application.dataset
      .getModel('CollectionsPage')
      .records.flatMap(page => `${websiteUrl}${page.slug}`);
    const homePage = [`${websiteUrl}/`];
    const staticPages = ['/about', '/faq', '/cookies'].map(
      page => `${websiteUrl}${page}`
    );

    const pages = [
      homePage,
      ...collectionsPages,
      ...snippetPages,
      ...collectionPages,
      ...staticPages,
    ];

    logger.log(`Generating sitemap for ${pages.length} routes`);
    const sitemap = template({
      nodes: pages,
    });

    await writeFile(outPath, sitemap);
    logger.success('Generating sitemap complete');
  };
}
