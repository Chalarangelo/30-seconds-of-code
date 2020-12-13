import path from 'path';
import paths from 'settings/paths';
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
    // Note that we cannot really use global.settings here as this might have to
    // run before onPreInit of the gatsby server. So imports it is.
    return {
      templates: paths.templates.reduce((acc, tmpl) => {
        acc[tmpl.name] = path.resolve(`${paths.templatesPath}/${tmpl.path}`);
        return acc;
      }, {}),
      requirables: JSONParser.fromChunks(paths.contentPath),
    };
  };
}
