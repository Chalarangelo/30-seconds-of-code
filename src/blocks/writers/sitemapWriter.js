import fs from 'node:fs';
import { writeFile } from 'node:fs/promises';
import handlebars from 'handlebars';
import pathSettings from '#settings/paths';
import globalSettings from '#settings/global';
import { Logger } from '#blocks/utilities/logger';

const { websiteUrl } = globalSettings;
const outPath = `${pathSettings.publicPath}/sitemap.xml`;
const templatePath = 'src/templates/sitemapTemplate.hbs';

/**
 * Writes the sitemap.xml file.
 */
export class SitemapWriter {
  /**
   * Generates the website's sitemap from the JSON files of the pages.
   * @param {Application} application The application instance.
   * @returns {Promise} A promise that will resolve when the sitemap has been
   * written to disk.
   */
  static write = async application => {
    const logger = new Logger('SitemapWriter.write');
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));
    const { dataset } = application;
    const snippetPages = dataset
      .getModel('SnippetPage')
      .records.published.map(page => `${websiteUrl}${page.slug}`, {
        flat: true,
      });
    const collectionPages = dataset
      .getModel('CollectionPage')
      .records.map(page => `${websiteUrl}${page.slug}`, { flat: true });
    const collectionsPages = dataset
      .getModel('CollectionsPage')
      .records.map(page => `${websiteUrl}${page.slug}`, { flat: true });
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
