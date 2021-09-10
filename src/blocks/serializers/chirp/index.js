import fs from 'fs-extra';
import { writeFile } from 'fs/promises';
import pathSettings from 'settings/paths';
import chirpSettings from 'settings/chirp';
import { truncateString } from 'utils';
import { Requirements } from 'blocks/utilities/requirements';
import { Logger } from 'blocks/utilities/logger';

export class ChirpSerializer {
  static serialize = async () => {
    const { chirpFileName, chirpRules, maxCaptionLength } = chirpSettings;
    const { publicPath } = pathSettings;
    const boundLog = Logger.bind('serializers.chirp.serialize');
    const nodes = Requirements.load().requirables.reduce((acc, s) => {
      if (s.isUnlisted || s.template !== 'SnippetPage' || +s.priority <= 0.06)
        return acc;
      const rule = chirpRules.find(r => new RegExp(r.matcher).test(s.relRoute));
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

    fs.ensureDirSync(`${publicPath}`);
    await writeFile(
      `${publicPath}/${chirpFileName}`,
      JSON.stringify(nodes, null, 2)
    );

    boundLog(`Generating chirps for ${nodes.length} pages complete`, 'success');
  };
}
