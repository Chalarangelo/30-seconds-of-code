import { convertToSeoSlug } from 'utils';

/**
 * Given a raw snippet file path, returns the matching config.
 * @param {Array} configs - An array of enriched configuration objects
 * @param {string} snippetPath - The path of the raw snippet file.
 */
export const findConfigFromRawSnippetPath = (configs, snippetPath) => {
  const snippetDirName = snippetPath.split('/').slice(-3, -2)[0];
  return configs.find(cfg => cfg.dirName === snippetDirName);
};

/**
 * Given a raw snippet file path, returns the matching page slug.
 * @param {Array} configs - An array of enriched configuration objects
 * @param {string} snippetPath - The path of the raw snippet file.
 */
export const findSlugFromRawSnippetPath = (configs, snippetPath) => {
  const config = findConfigFromRawSnippetPath(configs, snippetPath);
  const snippetName = snippetPath.split('/').slice(-1)[0].split('.')[0];
  return `/${config.slugPrefix}${convertToSeoSlug(snippetName)}`;
};
