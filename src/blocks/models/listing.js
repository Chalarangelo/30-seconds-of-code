import { uniqueElements } from 'utils';
import tokenizeCollection from 'utils/search';
import { Ranker } from 'blocks/utilities/ranker';
import literals from 'lang/en';

const CARDS_PER_PAGE = 15;

export const listing = {
  name: 'Listing',
  fields: [
    {
      name: 'type',
      type: 'enumRequired',
      values: ['main', 'collections', 'collection'],
    },
    { name: 'slugPrefix', type: 'stringRequired' },
    { name: 'relatedRecordId', type: 'string' },
    { name: 'featuredIndex', type: 'number' },
    { name: 'dataName', type: 'string' },
    { name: 'dataSplash', type: 'string' },
    { name: 'dataDescription', type: 'string' },
    { name: 'dataFeaturedListings', type: 'stringArray' },
    { name: 'isTopLevel', type: 'booleanRequired' },
  ],
  properties: {
    hasParent: listing => Boolean(listing.parent),
    isMain: listing => listing.type === 'main',
    isCollections: listing => listing.type === 'collections',
    isBlog: listing => listing.id === 'collection/articles',
    isBlogTag: listing =>
      listing.hasParent && listing.parent === 'collection/articles',
    isLanguage: listing => listing.isTopLevel && !listing.isBlog,
    isCollection: listing => listing.type === 'collection',
    rootUrl: listing =>
      listing.hasParent ? listing.parent.slugPrefix : listing.slugPrefix,
    siblings: listing => (listing.hasParent ? listing.parent.children : []),
    siblingsExceptSelf: listing =>
      listing.hasParent ? listing.siblings.except(listing.id) : [],
    // Used to determine the order of listings in the search index.
    ranking: listing => {
      if (listing.isCollections) return 0.8;
      const rankingValue = Ranker.rankIndexableContent(
        listing.indexableContent
      );
      // Demote tag listings to promote language and curated content
      if (listing.hasParent) return rankingValue * 0.25;
      return rankingValue;
    },
    name: listing => listing.data.name,
    // This is not used the way you think.
    // We use literals.tag to get the "short" name in sublinks.
    // So what is this for? Listing preview cards and chips.
    shortName: listing => listing.data.name,
    description: listing => (listing.data ? listing.data.description : null),
    shortDescription: listing => {
      const shortDescription =
        listing.isMain || listing.isCollections
          ? null
          : listing.data.shortDescription;
      return shortDescription ? `<p>${shortDescription}</p>` : null;
    },
    slug: listing => `${listing.slugPrefix}/p/1`,
    splash: listing => (listing.data ? listing.data.splash : null),
    // TODO: Probably short description here, shortId non-existent?
    // TODO: Delete the pageDescription entries or something
    seoDescription: listing =>
      literals.pageDescription(listing.type, {
        snippetCount: listing.snippets.length,
        listingLanguage: listing.data.language
          ? listing.data.language.name
          : '',
        listingTag: listing.hasParent ? listing.data.shortId : '',
      }),
    featured: listing => (listing.isMain ? 0 : listing.data.featured || 0),
    isListed: listing => {
      return listing.featured > 0;
      // TODO: Figure it out?
      // const { type } = listing;
      // if (['blog', 'main', 'collection'].includes(type)) return true;
      // if (['language'].includes(type)) return listing.featured > 0;
      // return false;
    },
    // TODO: Needs to be updated, so searchable is part of config
    isSearchable: listing =>
      Boolean(
        listing.isListed &&
          !listing.isBlog &&
          !listing.isBlogTag &&
          listing.shortDescription
      ),
    // NOTE: This is a bit fiddly for listings without unique descriptions,
    // such as tags that inherit descriptions from the language parent. Worth
    // revisiting.
    searchTokens: listing => {
      const uniqueDescription =
        listing.isCollection && listing.shortDescription
          ? listing.shortDescription
          : '';
      return uniqueElements(
        tokenizeCollection(`${uniqueDescription} ${listing.name}`).map(v =>
          v.toLowerCase()
        )
      ).join(' ');
    },
    pageCount: listing =>
      Math.ceil(listing.listedSnippets.length / CARDS_PER_PAGE),
    listedSnippets: listing => {
      if (listing.isCollections) return listing.snippets;
      if (listing.isMain) return listing.snippets.listedByPopularity;
      // Catch all, also catches collection types
      return listing.snippets.published;
    },
    formattedSnippetCount: listing =>
      `${listing.listedSnippets.length} snippets`,
    indexableContent: listing =>
      [listing.name, listing.description].join(' ').toLowerCase(),
  },
  lazyProperties: {
    data:
      ({ models: { Collection } }) =>
      listing => {
        if (listing.isMain)
          return {
            name: listing.dataName,
            splash: listing.dataSplash,
            description: listing.dataDescription,
          };
        if (listing.isCollections)
          return {
            name: listing.dataName,
            splash: listing.dataSplash,
            description: listing.dataDescription,
          };
        return Collection.records.get(listing.relatedRecordId);
      },
    snippets:
      ({ models: { Snippet, Listing } }) =>
      listing => {
        if (listing.isMain) return Snippet.records;
        // Abuse the snippets logic here a little bit to avoid having a new model
        // just for the collections listing.
        if (listing.isCollections) return Listing.records.featured;
        return Snippet.records.only(...listing.data.snippets.flatPluck('id'));
      },
    sublinks:
      ({ models: { Listing } }) =>
      listing => {
        if (!listing.isTopLevel && !listing.parent) return [];
        if (listing.isCollections) return [];
        if (listing.isMain) {
          return [
            ...Listing.records.language
              .sort((a, b) => b.ranking - a.ranking)
              .flatMap(ls => ({
                title: ls.shortName.replace(/ Snippets$/g, ''),
                url: `${ls.rootUrl}/p/1`,
                selected: false,
              })),
            {
              title: 'More collections',
              url: '/collections/p/1',
              selected: false,
            },
          ];
        }
        const links = listing.parent ? listing.siblings : listing.children;
        return [
          {
            title: literals.tag('all'),
            url: `${listing.rootUrl}/p/1`,
            selected: listing.isTopLevel,
          },
          ...links
            .flatMap(link => ({
              title: link.data.shortName,
              url: `/${link.data.slug}/p/1`,
              selected: listing.isCollection && link.id === listing.id,
            }))
            .sort((a, b) => a.title.localeCompare(b.title)),
        ];
      },
  },
  methods: {
    pageRanking: (listing, pageNumber) => {
      const listingRanking = listing.ranking * 0.5;
      // Promote first page, demote pages after third
      const pageRanking = pageNumber === 1 ? 0.25 : pageNumber <= 3 ? 0 : -0.25;
      return listingRanking + pageRanking;
    },
  },
  cacheProperties: [
    'data',
    'snippets',
    'hasParent',
    'isMain',
    'isBlog',
    'isBlogTag',
    'isLanguage',
    'isCollection',
    'rootUrl',
    'ranking',
    'name',
    'shortName',
    'description',
    'shortDescription',
    'slug',
    'splash',
    'seoDescription',
    'featured',
    'isListed',
    'isSearchable',
    'searchTokens',
    'listedSnippets',
    'formattedSnippetCount',
  ],
  scopes: {
    main: listing => listing.isMain,
    blog: listing => listing.isBlog,
    language: listing => listing.isLanguage,
    tag: listing => listing.hasParent,
    collection: listing => listing.isCollection,
    listed: listing => listing.isListed,
    searchable: {
      matcher: listing => listing.isSearchable,
      sorter: (a, b) => b.ranking - a.ranking,
    },
    featured: {
      matcher: listing => listing.featuredIndex !== -1,
      sorter: (a, b) => a.featuredIndex - b.featuredIndex,
    },
  },
};
