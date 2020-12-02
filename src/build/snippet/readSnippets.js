import { FileParser } from 'build/parsers/file';
import { compileSnippet } from 'build/snippet/compileSnippet';

/**
 * Synchronously read all snippets and sort them as necessary.
 * The sorting is case-insensitive.
 * @param {string} snippetsPath - The path of the snippets directory.
 * @param {string} assetPath - The public path of the assets directory.
 * @param {string} outPath - The output path of the snippets directory.
 * @param {object} config - The project's enriched configuration
 *  (containing the spread config, commonData and prefixes).
 * @param {array} langData - An array of `(language, icon)` tuples.
 * @param {function} boundLog - A bound logger.log function.
 */
export const readSnippets = async (snippetsPath, config, boundLog) => {
  const snippetFilenames = await FileParser.fromDir(snippetsPath);

  let snippets = [];
  try {
    for (let snippet of snippetFilenames) {
      const snippetData = await compileSnippet(snippetsPath, snippet, config);
      snippets.push(snippetData);
    }
  } catch (err) {
    /* istanbul ignore next */
    boundLog(`Fatal error while reading snippets: ${err}`, 'error');
    boundLog(`Stack trace: ${err.stack}`, 'error');
    /* istanbul ignore next */
    process.exit(1);
  }
  return snippets;
};

export default readSnippets;
