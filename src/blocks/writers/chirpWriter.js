import { writeFile } from 'fs/promises';
import { truncateString } from 'utils';
import { Application } from 'blocks/application';

const { Logger } = Application;

const outPath = `${Application.settings.paths.publicPath}/chirp.json`;
const maxCaptionLength = 280;
const chirpRules = [
  {
    matcher: '^/js/s/',
    hashtags: '#JavaScript #LearnToCode #100DaysOfCode #CodeNewbie #Coding',
  },
  {
    matcher: '^/python/s/',
    hashtags: '#Python #LearnToCode #100DaysOfCode #CodeNewbie #Coding',
  },
  {
    matcher: '^/react/s/use',
    hashtags: '#ReactJS #LearnToCode #100DaysOfCode #CodeNewbie #Coding',
  },
];

/**
 * Writes the chirp.json file.
 */
export class ChirpWriter {
  /**
   * Writes the chirp.json file.
   * @returns {Promise} A promise that will resolve when the chirp.json file has
   * been written to disk.
   */
  static write = async () => {
    const logger = new Logger('ChirpWriter.write');
    const pages = Application.dataset.getModel('Page').records.chirpEligible;

    const nodes = pages.reduce((acc, page) => {
      const rule = chirpRules.find(r =>
        new RegExp(r.matcher).test(page.relRoute)
      );
      if (rule) {
        const description = `${page.context.snippet.title}: ${page.context.snippet.description}`;
        const link = page.fullRoute;
        // 2 is the total spacing between segments
        const maxDescriptionLength =
          maxCaptionLength - rule.hashtags.length - link.length - 2;
        const truncatedDescription = truncateString(
          description,
          maxDescriptionLength
        );
        acc.push({
          url: link,
          caption: `${truncatedDescription} ${rule.hashtags} ${link}`,
        });
      }
      return acc;
    }, []);

    await writeFile(outPath, JSON.stringify(nodes, null, 2));
    logger.success(`Generating chirps for ${nodes.length} pages complete`);
  };
}
