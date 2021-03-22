import { Snippet } from 'blocks/entities/snippet';
import { SnippetContext } from 'blocks/adapters/snippetContext';
import { SnippetPreview } from 'blocks/adapters/snippetPreview';
import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { SnippetCollectionChip } from 'blocks/adapters/snippetCollectionChip';
import { ArgsError } from 'blocks/utilities/error';
import { JSONSerializer } from 'blocks/serializers/json';
import { Chunk } from 'blocks/utilities/chunk';
import { Logger } from 'blocks/utilities/logger';

/**
 * Serializes a Snippet object into appropriate JSON files.
 */
export class SnippetSerializer {
  static isDevelopment = process.env.NODE_ENV === `production`;
  /**
   * Serializes a Snippet object into JSON files.
   * @param {Snippet} snippet - A snippet object.
   * @param {Snippet} snippetCollection - (Optional) A snippet collection object
   *    of the 'collection' type.
   * @throws Will throw an error if `snippet` is not of the appropriate type.
   */
  static serializeSnippet = (snippet, snippetCollection = null) => {
    if (!(snippet instanceof Snippet)) {
      throw new ArgsError(
        "Invalid arguments. 'snippet' must be an instance of 'Snippet'."
      );
    }
    if (
      snippetCollection &&
      !(snippetCollection instanceof SnippetCollection)
    ) {
      throw new ArgsError(
        "Invalid arguments. 'snippetCollection' must be an instance of 'SnippetCollection'."
      );
    }

    const boundLog = Logger.bind('serializers.snippet.serializeSnippet');
    const { contentPath: outDirPath } = global.settings.paths;

    let chunkPairs = [
      [
        'index',
        Chunk.createIndex(
          snippet.slug,
          'SnippetPage',
          (snippet.ranking * 0.85).toFixed(2),
          {
            vscodeUrl: snippet.vscodeUrl,
            isUnlisted: !snippet.isListed,
          }
        ),
      ],
      [
        'snippet',
        {
          snippet: new SnippetContext(snippet).toObject({
            withVscodeUrl: Boolean(this.isDevelopment),
          }),
        },
      ],
      [
        'metadata',
        {
          cardTemplate: snippet.config.cardTemplate,
          breadcrumbs: snippet.breadcrumbs,
          pageDescription: snippet.seoDescription,
        },
      ],
    ];

    // This check here is to make sure we don't serialize data we don't have.
    if (Object.prototype.hasOwnProperty.call(snippet, 'recommendedSnippets')) {
      const recommendationsObject = {
        recommendedSnippets: snippet.recommendedSnippets.map(s =>
          new SnippetPreview(s).toObject()
        ),
      };
      // Serialize a snipept collection chip only if it exists
      if (snippetCollection)
        recommendationsObject.recommendedCollection = new SnippetCollectionChip(
          snippetCollection,
          { withDescription: true }
        ).toObject();

      chunkPairs.push(['recommendations', recommendationsObject]);
    }

    try {
      return JSONSerializer.serializeToDir(
        `${outDirPath}/${snippet.slug.slice(1)}`,
        ...chunkPairs
      );
    } catch (err) {
      boundLog(`Encountered an error while serializing ${snippet.id}`, 'error');
      boundLog(`${err}`, 'error');
      throw err;
    }
  };
}
