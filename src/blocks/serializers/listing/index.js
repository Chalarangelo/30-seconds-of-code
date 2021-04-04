import { SnippetCollection } from 'blocks/entities/snippetCollection';
import EXPERTISE_LEVELS from 'settings/expertise';
import literals from 'lang/en/listing';
import { SnippetCollectionListing } from 'blocks/adapters/snippetCollectionListing';
import { ArgsError } from 'blocks/utilities/error';
import { JSONSerializer } from 'blocks/serializers/json';
import { Chunk } from 'blocks/utilities/chunk';
import { Logger } from 'blocks/utilities/logger';
import { chunk } from 'utils';
import { SnippetPreview } from 'blocks/adapters/snippetPreview';

const ORDERS_MAP = {
  p: literals.orders.popularity,
  a: literals.orders.alphabetical,
  e: literals.orders.expertise,
  n: literals.orders.newest,
};

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
    const { contentPath: outDirPath } = global.settings.paths;

    const snippetCollectionListing = new SnippetCollectionListing(
      snippetCollection
    );

    const demoteBlogs =
      !['main', 'blog', 'collection'].includes(snippetCollection.type) &&
      !(snippetCollection.type === 'tag' && !snippetCollection.config.language);

    for (let order of snippetCollection.orders) {
      const paginatedSnippets = this._paginateOrderedSnippets(
        snippetCollection.isListed
          ? snippetCollection.snippets.filter(s => s.isListed)
          : snippetCollection.snippets,
        order,
        demoteBlogs
      );

      const isPopularityOrdered = order === 'p';
      const isMainListing =
        snippetCollection.type === 'main' && isPopularityOrdered;
      const isTopLevelListing =
        snippetCollection.isTopLevel && isPopularityOrdered;

      for (let [i, pageSnippets] of paginatedSnippets.entries()) {
        const isFirstPage = isPopularityOrdered && i === 0;
        const isMainListingFirstPage = isMainListing && isFirstPage;
        const isTopLevelListingFirstPage = isTopLevelListing && isFirstPage;
        const isMainTagListing =
          snippetCollection.type === 'tag' && isFirstPage;

        const pageNum = i + 1;
        const priority = isMainListingFirstPage
          ? 1.0
          : isTopLevelListingFirstPage || isMainListing
          ? 0.75
          : isMainTagListing || isTopLevelListing
          ? 0.5
          : 0.25;
        const outDir = `${outDirPath}${snippetCollection.slugPrefix}/${order}/${pageNum}`;

        const chunkPairs = [
          [
            'index',
            Chunk.createIndex(
              `${snippetCollection.slugPrefix}/${order}/${pageNum}`,
              'ListingPage',
              priority
            ),
          ],
          ['snippetList', { snippetList: pageSnippets }],
          [
            'metadata',
            {
              isMainListing,
              paginator: {
                pageNumber: pageNum,
                totalPages: paginatedSnippets.length,
                baseUrl: snippetCollection.slugPrefix,
                slugOrderingSegment: order,
              },
              sorter: {
                orders: snippetCollection.orders.map(order => ({
                  url: `${snippetCollection.slugPrefix}/${order}/1`,
                  title: ORDERS_MAP[order],
                })),
                selectedOrder: ORDERS_MAP[order],
              },
              ...snippetCollectionListing.toObject({ order }),
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
    }
  };

  static _paginateOrderedSnippets = (snippets, order, demoteBlogs = false) => {
    const snippetPreviews = snippets.map(s => new SnippetPreview(s).toObject());
    switch (order) {
      case 'a':
        return chunk(
          snippetPreviews.sort((a, b) => a.title.localeCompare(b.title)),
          CARDS_PER_PAGE
        );
      case 'e':
        return chunk(
          snippetPreviews.sort((a, b) =>
            a.expertise === b.expertise
              ? a.title.localeCompare(b.title)
              : !a.expertise
              ? 1
              : !b.expertise
              ? -1
              : EXPERTISE_LEVELS.indexOf(a.expertise) -
                EXPERTISE_LEVELS.indexOf(b.expertise)
          ),
          CARDS_PER_PAGE
        );
      case 'n':
        return chunk(
          snippets
            .sort((a, b) => +new Date(b.firstSeen) - +new Date(a.firstSeen))
            .map(s => new SnippetPreview(s).toObject()),
          CARDS_PER_PAGE
        );
      // It is assumed that snippets are always sorted by ranking in the SnippetCollection
      case 'p':
      default:
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
          : chunk(snippetPreviews, CARDS_PER_PAGE);
    }
  };
}
