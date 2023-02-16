import literals from 'lang/en';
import pathSettings from 'settings/paths';

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
    splashUrl: listing =>
      listing.splash
        ? `/${pathSettings.staticAssetPath}/splash/${listing.splash}`
        : `/${pathSettings.staticAssetPath}/splash/laptop-view.png`,
    url: listing => `${listing.slugPrefix}/p/1`,
    type: () => 'collection',
  },
  attributes: [
    ['shortName', 'title'],
    'url',
    'description',
    'tags',
    'searchTokens',
    'searchResultTag',
    'type',
    ['splashUrl', 'cover'],
  ],
};
