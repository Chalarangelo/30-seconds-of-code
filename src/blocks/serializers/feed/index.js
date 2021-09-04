import util from 'util';
import fs from 'fs-extra';
import handlebars from 'handlebars';
import globalSettings from 'settings/global';
import pathSettings from 'settings/paths';
import feedSettings from 'settings/feed';
import { Requirements } from 'blocks/utilities/requirements';
import { Logger } from 'blocks/utilities/logger';

const writeFile = util.promisify(fs.writeFile);

const isBlogSnippet = req => req.context.cardTemplate === 'BlogSnippetCard';
// TODO: After the hooks feed experiment (#366) is complete,
// we should either remove or formalize this.
const isReactHookSnippet = req => {
  return (
    req.context.cardTemplate === 'StandardSnippetCard' &&
    req.context.snippet.language &&
    req.context.snippet.language.long === 'React' &&
    req.context.snippet.tags &&
    req.context.snippet.tags.primary === 'Hooks'
  );
};

/**
 * Serializes feed.xml files.
 */
export class FeedSerializer {
  /**
   * Generates the website's feed.xml from the JSON files of the pages.
   * @param {object} options - An options object, containing the following:
   *  - `feedFileName`: Name of the feed XML file.
   *  - `publicPath`: Path for the generated XML file.
   *  - `websiteUrl`: Root URL of the website.
   *  - `websiteDescription`: Website description.
   *  - `websiteUrl`: Name of the website.
   *
   * All `options` values default to values from settings.
   * @returns {Promise} A promise that will resolve when the feed has been written to disk.
   */
  static serialize = async ({
    feedFileName = feedSettings.feedFileName,
    feedTemplatePath = feedSettings.feedTemplatePath,
    publicPath = pathSettings.publicPath,
    websiteUrl = globalSettings.websiteUrl,
    websiteDescription = globalSettings.websiteDescription,
    websiteName = globalSettings.websiteName,
  } = {}) => {
    const boundLog = Logger.bind('serializers.feed.serialize');
    const template = handlebars.compile(
      fs.readFileSync(feedTemplatePath, 'utf-8')
    );
    const nodes = Requirements.load()
      .requirables.filter(
        x => (isBlogSnippet(x) || isReactHookSnippet(x)) && !x.isUnlisted
      )
      .sort(
        (a, b) =>
          new Date(b.context.snippet.firstSeen) -
          new Date(a.context.snippet.firstSeen)
      )
      .slice(0, 25) // TODO: Revert to 15 or figure out optimal length after experiment
      .map(s => ({
        // TODO: Create a proper literal after experiment or revert
        title: isReactHookSnippet(s)
          ? `React ${s.context.snippet.title} hook`
          : s.context.snippet.title,
        fullRoute: s.fullRoute,
        description: s.context.pageDescription,
        pubDate: new Date(s.context.snippet.firstSeen).toUTCString(),
      }));
    boundLog(`Generating feed for top blog routes`, 'info');

    const feed = template({
      nodes,
      websiteName,
      websiteDescription,
      websiteUrl,
    });

    await writeFile(`${publicPath}/${feedFileName}`, feed);

    boundLog('Generating feed complete', 'success');
  };
}
