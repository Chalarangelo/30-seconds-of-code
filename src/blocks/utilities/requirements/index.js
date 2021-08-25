import path from 'path';
import pathSettings from 'settings/paths';
import { JSONParser } from 'blocks/parsers/json';

/**
 * Helper methods for loading requirements.
 */
export class Requirements {
  /* istanbul ignore next */
  /**
   * Returns an object containing templates and requirables.
   */
  static load = () => {
    return {
      templates: pathSettings.templates.reduce((acc, tmpl) => {
        acc[tmpl.name] = path.resolve(
          `${pathSettings.templatesPath}/${tmpl.path}`
        );
        return acc;
      }, {}),
      requirables: JSONParser.fromChunks(pathSettings.contentPath),
    };
  };
}
