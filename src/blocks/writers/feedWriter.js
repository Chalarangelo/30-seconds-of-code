import fs from 'node:fs';
import { writeFile } from 'node:fs/promises';
import handlebars from 'handlebars';
import pathSettings from '#settings/paths';
import globalSettings from '#settings/global';
import { Logger } from '#blocks/utilities/logger';

const { websiteUrl, websiteDescription, websiteName } = globalSettings;
const outPath = `${pathSettings.publicPath}/feed.xml`;
const templatePath = 'src/templates/rssTemplate.hbs';

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
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));
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
