export const listingPreviewSerializer = {
  name: 'ListingPreviewSerializer',
  methods: {
    description: (listing, { withDescription } = {}) =>
      withDescription ? listing.shortDescription : undefined,
    searchTokens: (listing, { withSearchTokens } = {}) =>
      withSearchTokens ? listing.searchTokens : undefined,
    url: listing => `${listing.slugPrefix}/p/1`,
  },
  attributes: [
    ['shortName', 'title'],
    'url',
    'icon',
    'description',
    'searchTokens',
  ],
};
