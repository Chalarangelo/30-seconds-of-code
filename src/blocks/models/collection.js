import { uniqueElements } from 'utils';
import tokenizeCollection from 'utils/search';
import { Ranker } from 'blocks/utilities/ranker';
import presentationSettings from 'settings/presentation';

// TODO: Add redirects for previous articles collections
// TODO: Only concern is the sitemap logic, but that can be extracted later or we can
// try the Astro plugin, I guess.
// As priority and changefreq are ignored by Google, the ranking of all pages
// won't be a concern and we can simplify the generation by a whole lot.
export const collection = {
  name: 'Collection',
  fields: [
    { name: 'name', type: 'stringRequired' },
    { name: 'shortName', type: 'stringRequired' },
    { name: 'miniName', type: 'stringRequired' },
    { name: 'slug', type: 'stringRequired' },
    { name: 'featured', type: 'booleanRequired' },
    { name: 'featuredIndex', type: 'number' },
    { name: 'splash', type: 'stringRequired' },
    { name: 'description', type: 'stringRequired' },
    { name: 'shortDescription', type: 'stringRequired' },
    { name: 'seoDescription', type: 'stringRequired' },
    { name: 'topLevel', type: 'booleanRequired' },
  ],
  properties: {
    hasParent: collection => Boolean(collection.parent),
    isMain: collection => collection.id === 'list',
    isPrimary: collection => collection.topLevel,
    isSecondary: collection => collection.hasParent,
    rootUrl: collection =>
      collection.hasParent ? collection.parent.slug : collection.slug,
    siblings: collection =>
      collection.hasParent ? collection.parent.children : [],
    siblingsExceptSelf: collection =>
      collection.hasParent ? collection.siblings.except(collection.id) : [],
    ranking: collection =>
      Ranker.rankIndexableContent(collection.indexableContent),
    isSearchable: collection => Boolean(collection.featured),
    searchTokens: collection => {
      const uniqueDescription = collection.shortDescription || '';
      return uniqueElements(
        tokenizeCollection(`${uniqueDescription} ${collection.name}`).map(v =>
          v.toLowerCase()
        )
      ).join(' ');
    },
    firstPageSlug: collection => `${collection.slug}/p/1`,
    pageCount: collection =>
      Math.ceil(
        collection.listedSnippets.length / presentationSettings.cardsPerPage
      ),
    listedSnippets: collection => collection.snippets.listed.published,
    formattedSnippetCount: collection =>
      `${collection.listedSnippets.length} snippets`,
    indexableContent: collection =>
      [collection.name, collection.description, collection.shortDescription]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
  },
  lazyProperties: {
    sublinks:
      ({ models: { Collection } }) =>
      collection => {
        if (collection.isMain) {
          return [
            ...Collection.records.primary
              .sort((a, b) => b.ranking - a.ranking)
              .flatMap(c => ({
                title: c.miniName,
                url: c.firstPageSlug,
                selected: false,
              })),
            {
              title: 'More collections',
              url: '/collections/p/1',
              selected: false,
            },
          ];
        }

        if (!collection.isPrimary && !collection.hasParent) return [];
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
            .flatMap(link => ({
              title: link.miniName,
              url: link.firstPageSlug,
              selected: link.id === collection.id,
            }))
            .sort((a, b) => a.title.localeCompare(b.title)),
        ];
      },
  },
  cacheProperties: [
    'hasParent',
    'isMain',
    'isPrimary',
    'isSecondary',
    'siblings',
    'siblignsExceptSelf',
    'ranking',
    'seoDescription',
    'isSearchable',
    'searchTokens',
    'firstPageSlug',
    'pageCount',
    'listedSnippets',
    'formattedSnippetCount',
    'indexableContent',
  ],
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
