import fs from 'fs-extra';
import { writeFile } from 'fs/promises';
import pathSettings from 'settings/paths';
import chirpSettings from 'settings/chirp';
import { truncateString } from 'utils';
import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';

export class ChirpWriter {
  static write = async () => {
    const { chirpFileName, chirpRules, maxCaptionLength } = chirpSettings;
    const { publicPath } = pathSettings;
    const boundLog = Logger.bind('writers.chirp.write');
    const pages = Env.schema.getModel('Page').records.chirpEligible;
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

    fs.ensureDirSync(`${publicPath}`);
    await writeFile(
      `${publicPath}/${chirpFileName}`,
      JSON.stringify(nodes, null, 2)
    );

    boundLog(`Generating chirps for ${nodes.length} pages complete`, 'success');
  };
}
