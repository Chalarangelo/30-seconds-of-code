import literals from 'lang/en';

export const listingPreviewSerializer = {
  name: 'ListingPreviewSerializer',
  methods: {
    description: (listing, { withDescription } = {}) =>
      withDescription ? listing.shortDescription : undefined,
    tags: () => literals.snippetCollection,
    searchTokens: (listing, { withSearch } = {}) =>
      withSearch ? listing.searchTokens : undefined,
    searchResultTag: (listing, { withSearch } = {}) =>
      withSearch ? literals.snippetCollectionShort : undefined,
    url: listing => `${listing.slugPrefix}/p/1`,
  },
  attributes: [
    ['shortName', 'title'],
    'url',
    'icon',
    'description',
    'tags',
    'searchTokens',
    'searchResultTag',
  ],
};
