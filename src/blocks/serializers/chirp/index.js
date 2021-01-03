import util from 'util';
import { truncateString } from 'utils';
import fs from 'fs-extra';
import { Requirements } from 'blocks/utilities/requirements';
import { Logger } from 'blocks/utilities/logger';

const writeFile = util.promisify(fs.writeFile);

export class ChirpSerializer {
  static serialize = async ({
    chirpFileName = global.settings.chirp.chirpFileName,
    rules = global.settings.chirp.chirpRules,
    maxCaptionLength = global.settings.chirp.maxCaptionLength,
    jsonPath = global.settings.paths.jsonPath,
  } = {}) => {
    const boundLog = Logger.bind('serializers.chirp.serialize');
    const nodes = Requirements.load().requirables.reduce((acc, s) => {
      const rule = rules.find(r => new RegExp(r.matcher).test(s.relRoute));
      if (rule) {
        const description = `${s.context.snippet.title}: ${s.context.snippet.description}`;
        const link = s.fullRoute;
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

    fs.ensureDirSync(`${jsonPath}`);
    await writeFile(
      `${jsonPath}/${chirpFileName}`,
      JSON.stringify(nodes, null, 2)
    );

    boundLog(`Generating chirps for ${nodes.length} pages complete`, 'success');
  };
}
