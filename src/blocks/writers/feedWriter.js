import { writeFile } from 'node:fs/promises';
import pathSettings from '#settings/paths';
import globalSettings from '#settings/global';
import { escapeHTML } from '#utils';
import { Logger } from '#blocks/utilities/logger';

const { websiteUrl, websiteDescription, websiteName } = globalSettings;
const outPath = `${pathSettings.publicPath}/feed.xml`;

const template = ({ websiteName, websiteDescription, websiteUrl, nodes }) =>
  `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" version="2.0">
  <channel>
    <title>${websiteName}</title>
    <description>${websiteDescription}</description>
    <link>${websiteUrl}</link>
    <language>en-us</language>
    <image>
      <url>${websiteUrl}/assets/logo.png</url>
      <title>${websiteName}</title>
      <link>${websiteUrl}</link>
    </image>
    <ttl>1440</ttl>
    <atom:link href="${websiteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${nodes
  .map(
    node =>
      `    <item>
      <title>${escapeHTML(node.title)}</title>
      <link>${node.fullRoute}</link>
      <description>${escapeHTML(node.description)}</description>
      <pubDate>${node.pubDate}</pubDate>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

/**
 * Writes the feed.xml file.
 */
export class FeedWriter {
  /**
   * Generates the website's feed.xml from the JSON files of the pages.
   * @param {Application} application The application instance.
   * @returns {Promise} A promise that will resolve when the feed has been
   * written to disk.
   */
  static write = async application => {
    const logger = new Logger('FeedWriter.write');
    const { dataset } = application;
    const pages = dataset.getModel('Snippet').records.listedByNew.slice(0, 50);
    logger.log(`Generating feed for new snippet routes`);

    const feed = template({
      nodes: pages.map(
        s => ({
          title: s.title,
          fullRoute: `${websiteUrl}${s.slug}`,
          description: s.seoDescription,
          pubDate: new Date(s.dateModified).toUTCString(),
        }),
        { flat: true }
      ),
      websiteName,
      websiteDescription,
      websiteUrl,
    });

    await writeFile(outPath, feed);

    logger.success('Generating feed complete');
  };
}
