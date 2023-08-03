import { uniqueElements } from 'utils';
import tokenizeCollection from 'utils/search';
import { Ranker } from 'blocks/utilities/ranker';
import presentationSettings from 'settings/presentation';

export const collection = {
  name: 'Collection',
  fields: {
    name: 'string',
    shortName: 'string',
    miniName: 'string',
    slug: 'string',
    featured: 'boolean',
    featuredIndex: 'number',
    splash: 'string',
    description: 'string',
    shortDescription: 'string',
    seoDescription: 'string',
    topLevel: 'boolean',
  },
  properties: {
    hasParent: {
      body: collection => Boolean(collection.parent),
      cache: true,
    },
    isMain: {
      body: collection => collection.id === 'snippets',
      cache: true,
    },
    isPrimary: {
      body: collection => collection.topLevel,
      cache: true,
    },
    isSecondary: {
      body: collection => collection.hasParent,
      cache: true,
    },
    rootUrl: collection =>
      collection.hasParent ? collection.parent.slug : collection.slug,
    siblings: {
      body: collection =>
        collection.hasParent ? collection.parent.children : [],
      cache: true,
    },
    siblingsExceptSelf: {
      body: collection =>
        collection.hasParent ? collection.siblings.except(collection.id) : [],
      cache: true,
    },
    ranking: {
      body: collection =>
        Ranker.rankIndexableContent(collection.indexableContent),
      cache: true,
    },
    isSearchable: {
      body: collection => Boolean(collection.featured),
      cache: true,
    },
    searchTokens: {
      body: collection => {
        const uniqueDescription = collection.shortDescription || '';
        return uniqueElements(
          tokenizeCollection(`${uniqueDescription} ${collection.name}`)
        ).join(' ');
      },
      cache: true,
    },
    firstPageSlug: {
      body: collection => `${collection.slug}/p/1`,
      cache: true,
    },
    pageCount: {
      body: collection =>
        Math.ceil(
          collection.listedSnippets.length / presentationSettings.cardsPerPage
        ),
      cache: true,
    },
    listedSnippets: {
      body: collection => collection.snippets.listed.published,
      cache: true,
    },
    formattedSnippetCount: {
      body: collection => `${collection.listedSnippets.length} snippets`,
      cache: true,
    },
    formattedDescription: {
      body: collection =>
        collection.shortDescription
          .replace('<p>', '')
          .replace('</p>', '')
          .replace(/<a.*?>(.*?)<\/a>/g, '$1'),
      cache: true,
    },
    indexableContent: {
      body: collection =>
        [collection.name, collection.description, collection.shortDescription]
          .filter(Boolean)
          .join(' ')
          .toLowerCase(),
      cache: true,
    },
    sublinks: (collection, { models: { Collection } }) => {
      if (collection.isMain) {
        return [
          ...Collection.records.primary
            .sort((a, b) => b.ranking - a.ranking)
            .map(
              c => ({
                title: c.miniName,
                url: c.firstPageSlug,
                selected: false,
              }),
              { flat: true }
            ),
          {
            title: 'More collections',
            url: '/collections/p/1',
            selected: false,
          },
        ];
      }

      if (!collection.isPrimary && !collection.hasParent) return [];
      if (collection.isPrimary && collection.children.length === 0) return [];
      const links = collection.hasParent
        ? collection.siblings
        : collection.children;
      return [
        {
          title: 'All',
          url: `${collection.rootUrl}/p/1`,
          selected: collection.isPrimary,
        },
        ...links
          .map(
            link => ({
              title: link.miniName,
              url: link.firstPageSlug,
              selected: link.id === collection.id,
            }),
            { flat: true }
          )
          .sort((a, b) => a.title.localeCompare(b.title)),
      ];
    },
    preview: {
      body: (collection, { serializers: { PreviewSerializer } }) =>
        PreviewSerializer.serialize(collection, { type: 'collection' }),
      cache: true,
    },
  },
  methods: {
    // A little fiddly, but should work for the time being
    matchesTag: (collection, tag) => collection.id.endsWith(`/${tag}`),
  },
  scopes: {
    withParent: collection => collection.hasParent,
    primary: collection => collection.isPrimary,
    secondary: collection => collection.isSecondary,
    listed: collection => collection.isSearchable,
    ranked: {
      matcher: collection => collection.isSearchable,
      sorter: (a, b) => b.ranking - a.ranking,
    },
    featured: {
      matcher: listing => listing.featuredIndex !== -1,
      sorter: (a, b) => a.featuredIndex - b.featuredIndex,
    },
  },
};
