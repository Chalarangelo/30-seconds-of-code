import fs from 'fs-extra';
import { writeFile } from 'fs/promises';
import handlebars from 'handlebars';
import globalSettings from 'settings/global';
import pathSettings from 'settings/paths';
import { Application } from 'blocks/application';
import { Logger } from 'blocks/utilities/logger';

/**
 * Writes the feed.xml file.
 */
export class FeedWriter {
  static feedSettings = {
    feedTemplatePath: 'src/templates/rssTemplate.hbs',
    feedFileName: 'feed.xml',
  };

  /**
   * Generates the website's feed.xml from the JSON files of the pages.
   * @returns {Promise} A promise that will resolve when the feed has been written to disk.
   */
  static write = async () => {
    const { publicPath } = pathSettings;
    const { feedTemplatePath, feedFileName } = FeedWriter.feedSettings;
    const { websiteUrl, websiteDescription, websiteName } = globalSettings;
    const logger = new Logger('FeedWriter.write');
    const template = handlebars.compile(
      fs.readFileSync(feedTemplatePath, 'utf-8')
    );
    // TODO: Revert to 15 or figure out optimal length after experiment
    const pages = Application.dataset
      .getModel('Page')
      .records.feedEligible.slice(0, 25);
    logger.log(`Generating feed for top blog routes`);

    const feed = template({
      nodes: pages.flatMap(s => ({
        title: s.data.isReactHook ? `React ${s.data.title} hook` : s.data.title,
        fullRoute: s.fullRoute,
        description: s.context.pageDescription,
        pubDate: new Date(s.data.firstSeen).toUTCString(),
      })),
      websiteName,
      websiteDescription,
      websiteUrl,
    });

    await writeFile(`${publicPath}/${feedFileName}`, feed);

    logger.success('Generating feed complete');
  };
}
