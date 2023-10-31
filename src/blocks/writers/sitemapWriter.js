import { writeFile } from 'node:fs/promises';
import pathSettings from '#settings/paths';
import globalSettings from '#settings/global';
import { Logger } from '#blocks/utilities/logger';

const { websiteUrl } = globalSettings;
const outPath = `${pathSettings.publicPath}/sitemap.xml`;

const template = ({ nodes }) =>
  `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${nodes
  .map(
    node =>
      `    <url>
      <loc>${node}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`
  )
  .join('\n')}
  </urlset>`;

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
    const staticPages = ['/about', '/faq'].map(page => `${websiteUrl}${page}`);

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
