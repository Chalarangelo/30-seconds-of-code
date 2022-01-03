import { uniqueElements } from 'utils';
import tokenizeCollection from 'utils/search';
import literals from 'lang/en';

const CARDS_PER_PAGE = 15;

const BLOG_DEMOTION_RANKING_MULTIPLIER = 0.85;

export const listing = {
  name: 'Listing',
  fields: [
    {
      name: 'type',
      type: 'enumRequired',
      values: ['main', 'blog', 'language', 'tag', 'collection'],
    },
    { name: 'slugPrefix', type: 'stringRequired' },
    { name: 'relatedRecordId', type: 'string' },
    { name: 'featuredIndex', type: 'number' },
  ],
  properties: {
    isMain: listing => listing.type === 'main',
    isBlog: listing => listing.type === 'blog',
    isBlogTag: listing =>
      listing.type === 'tag' && listing.parent.type === 'blog',
    isLanguage: listing => listing.type === 'language',
    isTopLevel: listing => listing.isBlog || listing.isLanguage,
    isTag: listing => listing.type === 'tag',
    isCollection: listing => listing.type === 'collection',
    isParent: listing => listing.children && listing.children.length,
    isLeaf: listing => !listing.isParent,
    isRoot: listing => !listing.parent,
    rootUrl: listing =>
      listing.parent ? listing.parent.slugPrefix : listing.slugPrefix,
    siblings: listing => (listing.parent ? listing.parent.children : []),
    siblingsExceptSelf: listing =>
      listing.parent ? listing.siblings.except(listing.id) : [],
    sublinks: listing => {
      if (!listing.isBlog && !listing.isLanguage && !listing.isTag) return [];
      const links = listing.parent ? listing.siblings : listing.children;
      return [
        {
          name: literals.listing.tag('all'),
          url: `${listing.rootUrl}/p/1`,
          selected: listing.isParent,
        },
        ...links.flatMap(link => ({
          name: literals.listing.tag(link.data.shortId),
          url: `${link.data.slugPrefix}/p/1`,
          selected:
            listing.type === 'tag' &&
            listing.data.shortId === link.data.shortId,
        })),
      ];
    },
    // TODO: Use the Ranker to rank by keywords in the name/description etc.
    // Used to determine the order of listings in the search index.
    ranking: listing => {
      if (listing.isBlogTag) return 1;
      if (listing.isLanguage) return 0.75;
      if (listing.isBlog) return 0.5;
      if (listing.isTag) return 0.25;
      return 0; // Main is not searchable!
    },
    name: listing => {
      const { type } = listing;
      if (type === 'main') return literals.listing.snippetList;
      if (type === 'blog') return literals.listing.blog;
      if (type === 'language')
        return literals.listing.codelang(listing.data.language.name);
      if (type === 'collection') return listing.data.name;
      if (type === 'tag') return listing.data.name;
    },
    // This is not used the way you think.
    // We use literals.tag to get the "short" name in sublinks.
    // So what is  this for? Listing preview cards and chips.
    shortName: listing => {
      const { type } = listing;
      if (type === 'main') return literals.listing.snippetList;
      if (type === 'blog') return literals.listing.blog;
      if (type === 'language')
        return literals.listing.shortCodelang(listing.data.language.name);
      if (type === 'collection') return listing.data.name;
      if (type === 'tag') return listing.data.shortName;
    },
    description: listing => {
      const { type } = listing;
      return type === 'main' ? null : listing.data.description;
    },
    shortDescription: listing => {
      const { type } = listing;
      const shortDescription =
        type === 'main' ? null : listing.data.shortDescription;
      return shortDescription ? `<p>${shortDescription}</p>` : null;
    },
    splash: listing => {
      const { type } = listing;
      return type === 'main' ? null : listing.data.splash;
    },
    seoDescription: listing => {
      const { type } = listing;
      return literals.listing.pageDescription(type, {
        snippetCount: listing.snippets.size,
        listingLanguage: listing.data.language
          ? listing.data.language.name
          : '',
        listingTag: type === 'tag' ? listing.data.shortId : '',
      });
    },
    featured: listing =>
      listing.type === 'main' ? 0 : listing.data.featured || 0,
    icon: listing => listing.data.icon,
    isListed: listing => {
      const { type } = listing;
      if (['blog', 'main', 'collection'].includes(type)) return true;
      if (['language', 'tag'].includes(type)) return listing.featured > 0;
      return false;
    },
    isSearchable: listing => listing.isListed && listing.shortDescription,
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
      Math.ceil(listing.listedSnippets.count / CARDS_PER_PAGE),
    listedSnippets: listing => listing.snippets.listed,
    defaultOrdering: listing => {
      if (listing.isBlog || listing.isBlogTag) return 'new';
      if (listing.isCollection) return 'custom';
      return 'popularity';
    },
    orderedSnippets: listing => {
      const order = listing.defaultOrdering;
      if (order === 'popularity') {
        const blogMultiplier =
          !listing.isBlog && !listing.isMain && !listing.isCollection
            ? BLOG_DEMOTION_RANKING_MULTIPLIER
            : 1;
        return listing.listedSnippets.sort((a, b) => {
          const nA = a.isBlog ? a.ranking * blogMultiplier : a.ranking;
          const nB = b.isBlog ? b.ranking * blogMultiplier : b.ranking;
          return nB - nA;
        });
      }
      if (order === 'new') {
        return listing.listedSnippets.sort((a, b) => {
          return b.firstSeen - a.firstSeen;
        });
      }
      // Catch all, also catches 'custom' for collection types
      return listing.snippets;
    },
  },
  lazyProperties: {
    data: ({ models: { Repository, Tag, Collection } }) => listing => {
      if (listing.type === 'main') return {};
      if (listing.type === 'blog') return Repository.records.blog.first;
      if (listing.type === 'language')
        return Repository.records.get(listing.relatedRecordId);
      if (listing.type === 'tag') {
        return Tag.records.get(listing.relatedRecordId);
      }
      if (listing.type === 'collection')
        return Collection.records.get(listing.relatedRecordId);
      return {};
    },
    snippets: ({ models: { Snippet } }) => listing => {
      if (listing.type === 'main') return Snippet.records;
      if (listing.type === 'blog') return Snippet.records.blogs;
      if (listing.type === 'language') {
        const { id: languageId } = listing.data.language;
        return Snippet.records.filter(snippet => {
          const snippetLanguageId = snippet.language
            ? snippet.language.id
            : null;
          return snippetLanguageId === languageId;
        });
      }
      if (listing.type === 'tag') {
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
      if (listing.type === 'collection')
        return Snippet.records.only(...listing.data.snippets.flatPluck('id'));
      return [];
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
    'icon',
    'isListed',
    'isSearchable',
    'searchTokens',
  ],
  scopes: {
    main: listing => listing.isMain,
    blog: listing => listing.isBlog,
    language: listing => listing.isLanguage,
    tag: listing => listing.isTag,
    collection: listing => listing.isCollection,
    listed: listing => listing.isListed,
    searchable: listing => listing.isSearchable,
    featured: listing => listing.featuredIndex !== -1,
  },
};
