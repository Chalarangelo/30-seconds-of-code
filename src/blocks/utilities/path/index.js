import { convertToSeoSlug } from 'utils';

/**
 * Helper methods for working with paths.
 */
export class Path {
  /**
   * Given a raw snippet file path, returns the matching config.
   * @param {string} snippetPath - The path of the raw snippet file.
   * @param {Array} configs - An array of configuration objects
   */
  static findContentConfigFromRawSnippet = (
    snippetPath,
    configs = global.settings.configs
  ) => {
    const snippetDirName = snippetPath.split('/').slice(-3, -2)[0];
    return configs.find(cfg => cfg.dirName === snippetDirName);
  };

  /**
   * Given a raw snippet file path, returns the matching page slug.
   * @param {string} snippetPath - The path of the raw snippet file.
   * @param {Array} configs - An array of configuration objects
   */
  static findSlugFromRawSnippet = (
    snippetPath,
    configs = global.settings.configs
  ) => {
    const config = this.findContentConfigFromRawSnippet(snippetPath, configs);
    const snippetName = snippetPath.split('/').slice(-1)[0].split('.')[0];
    return `/${config.slugPrefix}${convertToSeoSlug(snippetName)}`;
  };
}
