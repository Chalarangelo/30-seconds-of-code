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
    { name: 'template', type: 'stringRequired' },
    { name: 'relatedRecordId', type: 'string' },
    { name: 'pageNumber', type: 'number' },
    { name: 'slug', type: 'string' },
    { name: 'staticPriority', type: 'number' },
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
      if (['NotFoundPage', 'SearchPage'].includes(page.template)) return false;
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
          SnippetPreviewSerializer,
          ListingContextSerializer,
          ListingPreviewSerializer,
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
          context.featuredCollections =
            ListingPreviewSerializer.serializeArray(listedCollections);
          context.featuredCollections.push({
            title: literals.moreCollections,
            url: '/collections/p/1',
            selected: false,
          });
          context.featuredSnippets = SnippetPreviewSerializer.serializeArray([
            ...newBlogs,
            ...topSnippets,
          ]);
          // TODO: Move this to a better place
          context.splashImage = '/assets/splash/work-sunrise.png';
          context.snippetListUrl = '/list/p/1';
          context.stringLiterals = {
            featuredSnippets: literals.featuredSnippets,
            tagline: literals.tagline,
            browseByCollection: literals.browseByCollection,
          };
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
            firstSeen: page.data.firstSeen,
            lastUpdated: page.data.lastUpdated,
            author: page.data.author,
          });

          let recommendedItems = SnippetPreviewSerializer.serializeArray(
            page.data.recommendedSnippets.toArray()
          );
          if (page.data.recommendedCollection)
            recommendedItems.unshift(
              ListingPreviewSerializer.serialize(
                page.data.recommendedCollection.listing,
                { withDescription: true }
              )
            );
          context.recommendations = {
            title: literals.recommendedContent,
            items: recommendedItems,
          };
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
                          label: literals.previousPage,
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
                          label: literals.nextPage,
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
            title:
              pageNumber === 1
                ? context.listingName
                : `${context.listingName} - Page ${pageNumber}`,
            slug: page.relRoute,
            items: context.snippetList,
          });
        }
        if (page.template === 'SearchPage') {
          const sortedSnippets = Snippet.records.listedByPopularity;
          context.searchIndex = [
            ...ListingPreviewSerializer.serializeArray(
              Listing.records.searchable.toArray(),
              {
                withDescription: true,
                withSearch: true,
              }
            ),
            ...SnippetPreviewSerializer.serializeArray(
              sortedSnippets.toArray(),
              {
                withSearch: true,
              }
            ),
          ];
          context.recommendations = {
            title: literals.popularSnippets,
            items: SnippetPreviewSerializer.serializeArray(
              sortedSnippets.slice(0, 3).toArray()
            ),
          };
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
      if (!page.isListing) return true;
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
      matcher: page => page.template === 'SnippetPage' && !page.isUnlisted,
      sorter: (a, b) => b.data.firstSeen - a.data.firstSeen,
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
