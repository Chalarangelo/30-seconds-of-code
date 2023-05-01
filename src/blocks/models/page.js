import globalConfig from 'settings/global';
import literals from 'lang/en';
import { Schemer } from 'blocks/utilities/schemer';
import { shuffle } from 'utils';

const routePrefix = globalConfig.websiteUrl;

const NEW_BLOG_CARDS = 5;
const TOP_SNIPPET_CARDS = 5;
const TOP_COLLECTION_CHIPS = 8;

export const page = {
  name: 'Page',
  fields: [
    { name: 'type', type: 'stringRequired' },
    { name: 'relatedRecordId', type: 'string' },
    { name: 'pageNumber', type: 'number' },
    { name: 'slug', type: 'string' },
    { name: 'staticPriority', type: 'number' },
  ],
  properties: {
    isStatic: page => page.type === 'static',
    isCollectionsListing: page => page.id.startsWith('listing_collections'),
    isSnippet: page => page.type === 'snippet',
    isListing: page => page.type === 'listing',
    isHome: page => page.id === 'home',
    isUnlisted: page => (page.isSnippet ? !page.data.isListed : false),
    isPublished: page => (page.isSnippet ? page.data.isPublished : true),
    isIndexable: page => {
      if (['404', 'search'].includes(page.id)) return false;
      if (!page.isSnippet) return true;
      return page.data.isPublished;
    },
    priority: page => {
      if (page.isSnippet) return +(page.data.ranking * 0.85).toFixed(2);
      if (page.isListing) return page.data.pageRanking(page.pageNumber);
      if (page.isStatic) return page.staticPriority;
      return 0.3;
    },
    relRoute: page => {
      if (page.isSnippet) return page.data.slug;
      if (page.isListing) return `${page.data.slugPrefix}/p/${page.pageNumber}`;
      if (page.isStatic) return page.slug;
      return '';
    },
    fullRoute: page => `${routePrefix}${page.relRoute}`,
  },
  lazyProperties: {
    data:
      ({ models: { Snippet, Listing } }) =>
      page => {
        if (page.isSnippet) return Snippet.records.get(page.relatedRecordId);
        if (page.isListing) return Listing.records.get(page.relatedRecordId);
        return {};
      },
    context:
      ({
        models: { Snippet, Listing },
        serializers: {
          SnippetContextSerializer,
          ListingContextSerializer,
          SearchResultSerializer,
          PreviewSerializer,
        },
      }) =>
      page => {
        let context = {};
        if (page.isHome) {
          const listedCollections = Listing.records.featured
            .toArray()
            .slice(0, TOP_COLLECTION_CHIPS);
          const newBlogs = Snippet.records.blogs.listedByNew
            .toArray()
            .slice(0, NEW_BLOG_CARDS);
          const topSnippets = shuffle(
            Snippet.records.snippets.listedByPopularity
              .toArray()
              .slice(0, TOP_SNIPPET_CARDS * 5)
          ).slice(0, TOP_SNIPPET_CARDS);
          // TODO: These are damn chips, I need to make it simpler
          context.featuredCollections = PreviewSerializer.serializeArray(
            listedCollections,
            { type: 'collection' }
          );
          context.featuredCollections.push({
            title: 'More collections',
            url: '/collections/p/1',
            selected: false,
          });
          context.featuredSnippets = PreviewSerializer.serializeArray(
            [...newBlogs, ...topSnippets],
            { type: 'snippet' }
          );
          // TODO: Move this to a better place
          context.splashImage = '/assets/splash/work-sunrise.png';
          context.snippetListUrl = '/list/p/1';
          context.pageDescription = literals.pageDescription('main', {
            snippetCount: Snippet.records.published.length,
          });
          context.structuredData = Schemer.generateHomeData();
        }
        if (page.isSnippet) {
          context.breadcrumbs = page.data.breadcrumbs;
          context.pageDescription = page.data.seoDescription;
          context.snippet = SnippetContextSerializer.serialize(page.data);
          context.structuredData = Schemer.generateSnippetData({
            title: page.data.seoTitle,
            slug: page.relRoute,
            description: context.snippet.description,
            cover: context.snippet.cover,
            dateModified: page.data.dateModified,
            author: page.data.author,
          });

          let recommendedItems = PreviewSerializer.serializeArray(
            page.data.recommendedSnippets.toArray(),
            { type: 'snippet' }
          );
          if (page.data.recommendedCollection)
            recommendedItems.unshift(
              PreviewSerializer.serialize(
                page.data.recommendedCollection.listing,
                { type: 'collection' }
              )
            );
          context.recommendations = recommendedItems;
        }
        if (page.isListing) {
          context.slug = page.relRoute;
          const pageNumber = page.pageNumber;
          const totalPages = page.data.pageCount;
          const baseUrl = page.data.slugPrefix;
          let buttons =
            totalPages === 2
              ? [1, 2]
              : [
                  1,
                  Math.min(Math.max(pageNumber, 2), totalPages - 1),
                  totalPages,
                ];
          context.paginator =
            totalPages > 1
              ? {
                  previous:
                    pageNumber > 1
                      ? {
                          url: `${baseUrl}/p/${pageNumber - 1}`,
                          label: 'Previous',
                        }
                      : null,
                  pages: buttons.map(buttonNumber => ({
                    label: buttonNumber,
                    url: `${baseUrl}/p/${buttonNumber}`,
                    current: buttonNumber === pageNumber,
                  })),
                  next:
                    pageNumber < totalPages
                      ? {
                          url: `${baseUrl}/p/${pageNumber + 1}`,
                          label: 'Next',
                        }
                      : null,
                }
              : null;
          Object.entries(ListingContextSerializer.serialize(page.data)).forEach(
            ([key, value]) => {
              context[key] = value;
            }
          );
          if (page.isCollectionsListing) {
            context.snippetList = PreviewSerializer.serializeArray(
              page.listings.toArray(),
              { type: 'collection' }
            );
          } else {
            context.snippetList = PreviewSerializer.serializeArray(
              page.snippets.toArray(),
              { type: 'snippet' }
            );
          }
          context.structuredData = Schemer.generateListingData({
            title:
              pageNumber === 1
                ? context.listingName
                : `${context.listingName} - Page ${pageNumber}`,
            slug: page.relRoute,
            items: context.snippetList,
          });
        }
        if (page.type === 'search') {
          const sortedSnippets = Snippet.records.listedByPopularity;
          context.searchIndex = [
            ...SearchResultSerializer.serializeArray(
              Listing.records.searchable.toArray(),
              { type: 'collection' }
            ),
            ...SearchResultSerializer.serializeArray(sortedSnippets.toArray(), {
              type: 'snippet',
            }),
          ];
        }
        return context;
      },
  },
  cacheProperties: [
    'data',
    'context',
    'relRoute',
    'fullRoute',
    'priority',
    'isUnlisted',
    'isPublished',
    'isIndexable',
    'isCollectionsListing',
    'isStatic',
    'isSnippet',
    'isListing',
    'isHome',
  ],
  scopes: {
    listed: page => !page.isUnlisted && page.id !== '404',
    indexable: {
      matcher: page => page.isIndexable,
      sorter: (a, b) => b.priority - a.priority,
    },
    published: page => page.isPublished,
    feedEligible: {
      matcher: page => page.type === 'snippet' && !page.isUnlisted,
      sorter: (a, b) => b.data.dateModified - a.data.dateModified,
    },
    snippets: page => page.isSnippet,
    // Exclude collections listing to avoid path conflicts in Next.js
    listing: page => page.isListing,
    static: page => page.isStatic,
    home: page => page.isHome,
    search: page => page.id === 'search',
    collections: page => page.isCollectionsListing,
  },
};
