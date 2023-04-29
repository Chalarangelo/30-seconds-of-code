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
      values: ['main', 'collections', 'blog', 'language', 'tag', 'collection'],
    },
    { name: 'slugPrefix', type: 'stringRequired' },
    { name: 'relatedRecordId', type: 'string' },
    { name: 'featuredIndex', type: 'number' },
    { name: 'dataName', type: 'string' },
    { name: 'dataSplash', type: 'string' },
    { name: 'dataDescription', type: 'string' },
    { name: 'dataFeaturedListings', type: 'stringArray' },
  ],
  properties: {
    isMain: listing => listing.type === 'main',
    isCollections: listing => listing.type === 'collections',
    isBlog: listing => listing.type === 'blog',
    isBlogTag: listing =>
      listing.type === 'tag' && listing.parent.type === 'blog',
    isLanguage: listing => listing.type === 'language',
    isTopLevel: listing => listing.isBlog || listing.isLanguage,
    isTag: listing => listing.type === 'tag',
    isCollection: listing => listing.type === 'collection',
    isParent: listing => Boolean(listing.children && listing.children.length),
    isLeaf: listing => !listing.isParent,
    isRoot: listing => !listing.parent,
    rootUrl: listing =>
      listing.parent ? listing.parent.slugPrefix : listing.slugPrefix,
    siblings: listing => (listing.parent ? listing.parent.children : []),
    siblingsExceptSelf: listing =>
      listing.parent ? listing.siblings.except(listing.id) : [],
    // Used to determine the order of listings in the search index.
    ranking: listing => {
      if (listing.isCollections) return 0.8;
      const rankingValue = Ranker.rankIndexableContent(
        listing.indexableContent
      );
      // Demote tag listings to promote language and curated content
      if (listing.isTag) return rankingValue * 0.25;
      return rankingValue;
    },
    name: listing => {
      if (listing.isMain) return listing.data.name;
      if (listing.isCollections) return listing.data.name;
      if (listing.isBlog) return 'Articles';
      if (listing.isLanguage)
        return literals.codelang(listing.data.language.name);
      if (listing.isCollection) return listing.data.name;
      if (listing.isTag) return listing.data.name;
    },
    // This is not used the way you think.
    // We use literals.tag to get the "short" name in sublinks.
    // So what is  this for? Listing preview cards and chips.
    shortName: listing => {
      if (listing.isMain) return listing.data.name;
      if (listing.isCollections) return listing.data.name;
      if (listing.isBlog) return 'Articles';
      if (listing.isLanguage)
        return literals.shortCodelang(listing.data.language.name);
      if (listing.isCollection) return listing.data.name;
      if (listing.isTag) return listing.data.shortName;
    },
    description: listing => (listing.data ? listing.data.description : null),
    shortDescription: listing => {
      const shortDescription =
        listing.isMain || listing.isCollections
          ? null
          : listing.data.shortDescription;
      return shortDescription ? `<p>${shortDescription}</p>` : null;
    },
    splash: listing => (listing.data ? listing.data.splash : null),
    seoDescription: listing =>
      literals.pageDescription(listing.type, {
        snippetCount: listing.snippets.length,
        listingLanguage: listing.data.language
          ? listing.data.language.name
          : '',
        listingTag: listing.isTag ? listing.data.shortId : '',
      }),
    featured: listing => (listing.isMain ? 0 : listing.data.featured || 0),
    isListed: listing => {
      const { type } = listing;
      if (['blog', 'main', 'collection'].includes(type)) return true;
      if (['language', 'tag'].includes(type)) return listing.featured > 0;
      return false;
    },
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
      const { type } = listing;
      const uniqueDescription =
        ['blog', 'collection', 'language', 'tag'].includes(type) &&
        listing.shortDescription
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
    defaultOrdering: listing => {
      if (listing.isBlog || listing.isBlogTag) return 'new';
      if (listing.isCollection || listing.isCollections) return 'custom';
      return 'popularity';
    },
    listedSnippets: listing => {
      const order = listing.defaultOrdering;
      if (order === 'new') return listing.snippets.listedByNew;
      if (order === 'popularity') return listing.snippets.listedByPopularity;
      if (listing.isCollections) return listing.snippets;
      // Catch all, also catches 'custom' for collection types
      return listing.snippets.published;
    },
    indexableContent: listing =>
      [listing.name, listing.description].join(' ').toLowerCase(),
  },
  lazyProperties: {
    data:
      ({ models: { Repository, Tag, Collection } }) =>
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
            featuredListings: listing.dataFeaturedListings,
          };
        if (listing.isBlog) return Repository.records.blog.first;
        if (listing.isLanguage)
          return Repository.records.get(listing.relatedRecordId);
        if (listing.isTag) return Tag.records.get(listing.relatedRecordId);
        if (listing.isCollection)
          return Collection.records.get(listing.relatedRecordId);
        return {};
      },
    snippets:
      ({ models: { Snippet, Listing } }) =>
      listing => {
        if (listing.isMain) return Snippet.records;
        if (listing.isBlog) return Snippet.records.blogs;
        // Abuse the snippets logic here a little bit to avoid having a new model
        // just for the collections listing.
        if (listing.isCollections) return Listing.records.featured;
        if (listing.isLanguage) {
          const { id: languageId } = listing.data.language;
          return Snippet.records.filter(snippet => {
            const snippetLanguageId = snippet.language
              ? snippet.language.id
              : null;
            return snippetLanguageId === languageId;
          });
        }
        if (listing.isTag) {
          const { shortId: tagId } = listing.data;
          if (listing.isBlogTag) {
            return Snippet.records.blogs.where(snippet =>
              snippet.tags.includes(tagId)
            );
          } else {
            const { id: languageId } = listing.data.repository.language;
            return Snippet.records.filter(snippet => {
              const snippetLanguageId = snippet.language
                ? snippet.language.id
                : null;
              return (
                snippetLanguageId === languageId && snippet.tags.includes(tagId)
              );
            });
          }
        }
        if (listing.isCollection)
          return Snippet.records.only(...listing.data.snippets.flatPluck('id'));
        return [];
      },
    sublinks:
      ({ models: { Listing } }) =>
      listing => {
        if (listing.isCollection && !listing.parent) return [];
        if (listing.isCollections) return [];
        if (listing.isMain) {
          return [
            ...Listing.records.language
              .sort((a, b) => b.ranking - a.ranking)
              .flatMap(ls => ({
                title: ls.shortName,
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
            selected: listing.isParent,
          },
          ...links
            .flatMap(link =>
              link.isCollection
                ? {
                    title: link.data.shortName,
                    url: `/${link.data.slug}/p/1`,
                    selected: listing.isCollection && link.id === listing.id,
                  }
                : {
                    title: literals.tag(link.data.shortId),
                    url: `${link.data.slugPrefix}/p/1`,
                    selected:
                      listing.isTag &&
                      listing.data.shortId === link.data.shortId,
                  }
            )
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
    'isMain',
    'isBlog',
    'isBlogTag',
    'isLanguage',
    'isTopLevel',
    'isTag',
    'isCollection',
    'isParent',
    'isLeaf',
    'isRoot',
    'rootUrl',
    'ranking',
    'name',
    'shortName',
    'description',
    'shortDescription',
    'splash',
    'seoDescription',
    'featured',
    'isListed',
    'isSearchable',
    'searchTokens',
    'listedSnippets',
  ],
  scopes: {
    main: listing => listing.isMain,
    blog: listing => listing.isBlog,
    language: listing => listing.isLanguage,
    tag: listing => listing.isTag,
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
