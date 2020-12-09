import { Snippet } from 'build/entities/snippet';
import { SnippetContext } from 'build/adapters/snippetContext';
import { TextParser } from 'build/parsers/text';
import { JSONSerializer } from 'build/serializers/json';
import { Chunk } from 'build/utilities/chunk';
import { transformBreadcrumbs } from 'build/transformers';
import { Logger } from 'build/utilities/logger';

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
export const readSnippets = async (snippetsPath, config) => {
  const boundLog = Logger.bind('tasks.readSnippets');
  return await TextParser.fromDir(snippetsPath, {
    withMetadata: true,
  }).then(data =>
    data.map(s => {
      try {
        const snippet = new Snippet(s, config);
        const cardTemplate = config.cardTemplate;
        JSONSerializer.serializeToDir(
          `${snippet.config.outPath}/${snippet.slug.slice(1)}`,
          [
            'index',
            Chunk.createIndex(
              snippet.slug,
              'SnippetPage',
              (snippet.ranking * 0.85).toFixed(2),
              {
                vscodeUrl: snippet.vscodeUrl,
              }
            ),
          ],
          ['snippet', { snippet: new SnippetContext(snippet).toObject() }],
          [
            'metadata',
            {
              cardTemplate,
              // TODO: Create something for breadcrumbs
              breadcrumbs: transformBreadcrumbs(snippet, cardTemplate),
              pageDescription: snippet.seoDescription,
            },
          ]
        );
        return snippet;
      } catch (err) {
        /* istanbul ignore next */
        boundLog(`Fatal error while reading snippets: ${err}`, 'error');
        boundLog(`Stack trace: ${err.stack}`, 'error');
        /* istanbul ignore next */
        process.exit(1);
      }
    })
  );
};

export default readSnippets;
