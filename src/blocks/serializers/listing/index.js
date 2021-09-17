import pathSettings from 'settings/paths';
import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { SnippetCollectionListing } from 'blocks/adapters/snippetCollectionListing';
import { ArgsError } from 'blocks/utilities/error';
import { JSONSerializer } from 'blocks/serializers/json';
import { Chunk } from 'blocks/utilities/chunk';
import { Logger } from 'blocks/utilities/logger';
import { chunk } from 'utils';
import { SnippetPreview } from 'blocks/adapters/snippetPreview';

const CARDS_PER_PAGE = 15;

const BLOG_DEMOTION_RANKING_MULTIPLIER = 0.85;

/**
 * Serializes a SnippetCollection object into appropriate JSON files.
 */
export class ListingSerializer {
  /**
   * Serializes a SnippetCollection object into JSON files.
   * @param {SnippetCollection} snippetCollection - A collection of snippets.
   * @throws Will throw an error if `snippeCollection` is not of the appropriate type.
   */
  static serializeListings = async snippetCollection => {
    if (!(snippetCollection instanceof SnippetCollection)) {
      throw new ArgsError(
        "Invalid arguments. 'snippetCollection' must be an instance of 'SnippetCollection'."
      );
    }

    const boundLog = Logger.bind('serializers.listing.serializeListing');
    const { contentPath: outDirPath } = pathSettings;

    const snippetCollectionListing = new SnippetCollectionListing(
      snippetCollection
    );

    const demoteBlogs =
      !['main', 'blog', 'collection'].includes(snippetCollection.type) &&
      !(snippetCollection.type === 'tag' && !snippetCollection.config.language);

    const isOrderedByNew =
      snippetCollection.type === 'blog' ||
      (snippetCollection.type === 'tag' && !snippetCollection.config.language);

    const paginatedSnippets = ListingSerializer._paginateSnippets(
      snippetCollection.isListed
        ? snippetCollection.snippets.filter(s => s.isListed)
        : snippetCollection.snippets,
      isOrderedByNew,
      demoteBlogs
    );

    const isMainListing = snippetCollection.type === 'main';
    const isTopLevelListing = snippetCollection.isTopLevel;

    for (let [i, pageSnippets] of paginatedSnippets.entries()) {
      const isFirstPage = i === 0;
      const isMainListingFirstPage = isMainListing && isFirstPage;
      const isTopLevelListingFirstPage = isTopLevelListing && isFirstPage;
      const isMainTagListing = snippetCollection.type === 'tag' && isFirstPage;

      const pageNum = i + 1;
      const pageSlug = `${snippetCollection.slugPrefix}/p/${pageNum}`;
      const priority = isMainListingFirstPage
        ? 1.0
        : isTopLevelListingFirstPage || isMainListing
        ? 0.75
        : isMainTagListing || isTopLevelListing
        ? 0.5
        : 0.25;
      const outDir = `${outDirPath}${pageSlug}`;

      const chunkPairs = [
        ['index', Chunk.createIndex(pageSlug, 'ListingPage', priority)],
        ['snippetList', { snippetList: pageSnippets }],
        [
          'metadata',
          {
            slug: pageSlug,
            paginator: {
              pageNumber: pageNum,
              totalPages: paginatedSnippets.length,
              baseUrl: snippetCollection.slugPrefix,
            },
            ...snippetCollectionListing.toObject(),
          },
        ],
      ];
      try {
        await JSONSerializer.serializeToDir(outDir, ...chunkPairs);
      } catch (err) {
        boundLog(
          `Encountered an error while serializing ${snippetCollection.name}`,
          'error'
        );
        boundLog(`${err}`, 'error');
        throw err;
      }
    }
  };

  static _paginateSnippets = (
    snippets,
    isOrderedByNew = false,
    demoteBlogs = false
  ) => {
    if (isOrderedByNew) {
      return chunk(
        snippets
          .sort((a, b) => +new Date(b.firstSeen) - +new Date(a.firstSeen))
          .map(s => new SnippetPreview(s).toObject()),
        CARDS_PER_PAGE
      );
    }
    // It is assumed that snippets are always sorted by ranking in the SnippetCollection
    return demoteBlogs
      ? chunk(
          snippets
            .sort((a, b) => {
              const nA = a.type.startsWith('blog')
                ? a.ranking * BLOG_DEMOTION_RANKING_MULTIPLIER
                : a.ranking;
              const nB = b.type.startsWith('blog')
                ? b.ranking * BLOG_DEMOTION_RANKING_MULTIPLIER
                : b.ranking;
              return nB - nA;
            })
            .map(s => new SnippetPreview(s).toObject()),
          CARDS_PER_PAGE
        )
      : chunk(
          snippets.map(s => new SnippetPreview(s).toObject()),
          CARDS_PER_PAGE
        );
  };
}
