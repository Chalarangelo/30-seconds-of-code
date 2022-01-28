import globalConfig from 'settings/global';
import literals from 'lang/en';
import { Schemer } from 'blocks/utilities/schemer';
import { shuffle } from 'utils';

const routePrefix = globalConfig.websiteUrl;

const NEW_BLOG_CARDS = 5;
const TOP_SNIPPET_CARDS = 5;
const TOP_COLLECTION_CHIPS = 6;

export const page = {
  name: 'Page',
  fields: [
    { name: 'template', type: 'stringRequired' },
    { name: 'relatedRecordId', type: 'string' },
    { name: 'pageNumber', type: 'number' },
    { name: 'slug', type: 'string' },
    { name: 'staticPriority', type: 'number' },
    { name: 'staticContext', type: 'objectRequired', defaultValue: {} },
  ],
  properties: {
    isStatic: page =>
      ['StaticPage', 'NotFoundPage', 'SearchPage'].includes(page.template),
    isCollectionsListing: page => page.id.startsWith('listing_collections'),
    isSnippet: page => page.template === 'SnippetPage',
    isListing: page => page.template === 'ListingPage',
    isHome: page => page.template === 'HomePage',
    isUnlisted: page => (page.isSnippet ? !page.data.isListed : false),
    isPublished: page => (page.isSnippet ? page.data.isPublished : true),
    isIndexable: page => {
      if (page.template === 'NotFoundPage') return false;
      if (!page.isSnippet) return true;
      return page.data.isPublished;
    },
    priority: page => {
      if (page.isHome) return 1.0;
      if (page.isCollectionsListing) return 0.65;
      if (page.isSnippet) return +(page.data.ranking * 0.85).toFixed(2);
      if (page.isListing) return page.data.pageRanking(page.pageNumber);
      if (page.isStatic) return page.staticPriority;
      return 0.3;
    },
    relRoute: page => {
      if (page.isHome) return '/';
      if (page.isSnippet) return page.data.slug;
      if (page.isListing) return `${page.data.slugPrefix}/p/${page.pageNumber}`;
      if (page.isStatic) return page.slug;
      return '';
    },
    fullRoute: page => `${routePrefix}${page.relRoute}`,
  },
  lazyProperties: {
    data: ({ models: { Snippet, Listing } }) => page => {
      if (page.isSnippet) return Snippet.records.get(page.relatedRecordId);
      if (page.isListing) return Listing.records.get(page.relatedRecordId);
      return {};
    },
    context: ({
      models: { Snippet, Listing },
      serializers: {
        SnippetContextSerializer,
        SnippetPreviewSerializer,
        ListingContextSerializer,
        ListingPreviewSerializer,
      },
    }) => page => {
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
        context.shelves = [
          {
            shelfType: 'collections',
            shelfName: literals.featuredCollections,
            shelfUrl: '/collections/p/1',
            shelfData: ListingPreviewSerializer.serializeArray(
              listedCollections
            ),
          },
          {
            shelfType: 'snippets',
            shelfName: literals.featuredSnippets,
            shelfUrl: '/list/p/1',
            shelfData: SnippetPreviewSerializer.serializeArray([
              ...newBlogs,
              ...topSnippets,
            ]),
          },
        ];
        context.pageDescription = literals.pageDescription('main', {
          snippetCount: Snippet.records.published.length,
        });
        context.structuredData = Schemer.generateHomeData();
      }
      if (page.isSnippet) {
        context.cardTemplate = page.data.cardTemplate;
        context.breadcrumbs = page.data.breadcrumbs;
        context.pageDescription = page.data.seoDescription;
        context.recommendedSnippets = SnippetPreviewSerializer.serializeArray(
          page.data.recommendedSnippets.toArray()
        );
        if (page.data.recommendedCollection)
          context.recommendedCollection = ListingPreviewSerializer.serialize(
            page.data.recommendedCollection.listing,
            { withDescription: true }
          );
        context.snippet = SnippetContextSerializer.serialize(page.data);
        context.structuredData = Schemer.generateSnippetData({
          title: page.data.title,
          slug: page.relRoute,
          description: context.snippet.description,
          cover: context.snippet.cover,
          firstSeen: page.data.firstSeen,
          lastUpdated: page.data.lastUpdated,
          author: page.data.authors.first,
        });
      }
      if (page.isListing) {
        context.slug = page.relRoute;
        context.paginator = {
          pageNumber: page.pageNumber,
          totalPages: page.data.pageCount,
          baseUrl: page.data.slugPrefix,
        };
        Object.entries(ListingContextSerializer.serialize(page.data)).forEach(
          ([key, value]) => {
            context[key] = value;
          }
        );
        if (page.isCollectionsListing) {
          context.snippetList = ListingPreviewSerializer.serializeArray(
            page.listings.toArray(),
            {
              withDescription: true,
            }
          );
        } else {
          context.snippetList = SnippetPreviewSerializer.serializeArray(
            page.snippets.toArray()
          );
        }
        context.structuredData = Schemer.generateListingData({
          title: context.listingName,
          slug: page.relRoute,
          items: context.snippetList,
        });
      }
      if (['StaticPage', 'NotFoundPage'].includes(page.template)) {
        context = { ...page.staticContext };
      }
      if (page.template === 'SearchPage') {
        const sortedSnippets = Snippet.records.listedByPopularity;
        context.searchIndex = [
          ...ListingPreviewSerializer.serializeArray(
            Listing.records.searchable.toArray(),
            {
              withDescription: true,
              withSearchTokens: true,
            }
          ),
          ...SnippetPreviewSerializer.serializeArray(sortedSnippets.toArray(), {
            withSearchTokens: true,
          }),
        ];
        context.recommendedSnippets = SnippetPreviewSerializer.serializeArray(
          sortedSnippets.slice(0, 3).toArray()
        );
        context.pageDescription = literals.pageDescription('search', {
          snippetCount: Snippet.records.length,
        });
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
  validators: {
    listingHasSnippets: page => {
      if (!page.isListing || page.id.startsWith('listing_collections'))
        return true;
      return page.snippets && page.snippets.length > 0;
    },
    listingHasPageNumber: page => {
      if (!page.isListing || page.id === 'collections') return true;
      return page.pageNumber > 0;
    },
    staticHasUniqueSlug: (page, pages) => {
      if (!page.isStatic) return true;
      if (!page.slug || page.slug.length === 0) return false;
      if (pages.filter(page => page.isStatic).some(p => p.slug === page.slug))
        return false;
      return true;
    },
    staticHasStaticPriority: page => {
      if (!page.isStatic) return true;
      return (
        !Number.isNaN(page.staticPriority) &&
        page.staticPriority >= 0 &&
        page.staticPriority <= 1
      );
    },
  },
  scopes: {
    listed: page => !page.isUnlisted && page.template !== 'NotFoundPage',
    indexable: {
      matcher: page => page.isIndexable,
      sorter: (a, b) => b.priority - a.priority,
    },
    published: page => page.isPublished,
    feedEligible: {
      matcher: page => {
        if (page.template !== 'SnippetPage') return false;
        if (page.isUnlisted) return false;
        if (page.data.isBlog) return true;
        if (page.data.isReactHook) return true;
        return false;
      },
      sorter: (a, b) => b.data.firstSeen - a.data.firstSeen,
    },
    chirpEligible: page => {
      if (page.template !== 'SnippetPage') return false;
      if (page.isUnlisted) return false;
      if (page.priority <= 0.06) return false;
      return true;
    },
    snippets: page => page.isSnippet,
    // Exclude collections listing to avoid path conflicts in Next.js
    listing: page => page.isListing,
    static: page => page.isStatic,
    home: page => page.isHome,
    search: page => page.template === 'SearchPage',
    collections: page => page.isCollectionsListing,
  },
};
