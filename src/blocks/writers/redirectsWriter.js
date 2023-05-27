import { writeFile } from 'fs/promises';
import pathSettings from 'settings/paths';

import { YAMLHandler } from 'blocks/utilities/yamlHandler';

import { Application } from 'blocks/application';

const { Logger } = Application;

const inPath = `${pathSettings.rawContentPath}/redirects.yaml`;
const outPath = `${pathSettings.publicPath}/_redirects`;

/**
 * Writes the _redirects file.
 */
export class RedirectsWriter {
  /**
   * Generates the website's _redirects from the YAML file in the content repo.
   * @returns {Promise} A promise that will resolve when the file has been
   * written to disk.
   */
  static write = async () => {
    const logger = new Logger('RedirectsWriter.write');
    const redirects = YAMLHandler.fromFile(inPath);
    logger.log(`Generating redirects for ${redirects.length} routes`);

    const redirectsString = redirects
      .map(r => `${r.from} ${r.to} ${r.status}`)
      .join('\n');

    await writeFile(outPath, redirectsString);

    logger.success('Generating redirects complete');
  };
}
