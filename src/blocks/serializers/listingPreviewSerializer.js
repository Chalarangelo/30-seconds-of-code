import literals from 'lang/en';
import pathSettings from 'settings/paths';

export const listingPreviewSerializer = {
  name: 'ListingPreviewSerializer',
  methods: {
    description: (listing, { withDescription, withSearch } = {}) => {
      if (withSearch) return undefined;
      return withDescription
        ? listing.shortDescription
            .replace('<p>', '')
            .replace('</p>', '')
            .replace(/<a.*?>(.*?)<\/a>/g, '$1')
        : undefined;
    },
    tags: () => literals.snippetCollection,
    searchTokens: (listing, { withSearch } = {}) =>
      withSearch ? listing.searchTokens : undefined,
    searchResultTag: (listing, { withSearch } = {}) =>
      withSearch
        ? literals.snippetCount(listing.listedSnippets.length)
        : undefined,
    splashUrl: (listing, { withSearch } = {}) => {
      if (withSearch) return undefined;
      return listing.splash
        ? `/${pathSettings.staticAssetPath}/splash/${listing.splash}`
        : `/${pathSettings.staticAssetPath}/splash/laptop-view.png`;
    },
    snippetCount: (listing, { withSearch } = {}) => {
      if (withSearch) return undefined;
      literals.snippetCount(listing.listedSnippets.length);
    },
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
    ['snippetCount', 'extraContext'],
    'type',
    ['splashUrl', 'cover'],
  ],
};
