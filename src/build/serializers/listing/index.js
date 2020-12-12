import { SnippetCollection } from 'build/entities/snippetCollection';
import EXPERTISE_LEVELS from 'config/expertise';
import literals from 'lang/en/listing';
import { SnippetCollectionListing } from 'build/adapters/snippetCollectionListing';
import { ArgsError } from 'build/utilities/error';
import { JSONSerializer } from 'build/serializers/json';
import { Chunk } from 'build/utilities/chunk';
import { Logger } from 'build/utilities/logger';
import { chunk } from 'utils';
import { SnippetPreview } from 'build/adapters/snippetPreview';

const ORDERS_MAP = {
  p: literals.orders.popularity,
  a: literals.orders.alphabetical,
  e: literals.orders.expertise,
  n: literals.orders.newest,
};

const CARDS_PER_PAGE = 15;

export class ListingSerializer {
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

    for (let order of snippetCollection.orders) {
      const paginatedSnippets = this.paginateOrderedSnippets(
        snippetCollection.isListed
          ? snippetCollection.snippets.filter(s => s.isListed)
          : snippetCollection.snippets,
        order
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

  static paginateOrderedSnippets = (snippets, order) => {
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
      // It is assumed that snippets are always sorted by ranking
      // in the SnippetCollection constructor
      case 'p':
      default:
        return chunk(snippetPreviews, CARDS_PER_PAGE);
    }
  };
}
