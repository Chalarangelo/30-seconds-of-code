import pathSettings from 'settings/paths';

export const listingContextSerializer = {
  name: 'ListingContextSerializer',
  methods: {
    splashUrl: listing =>
      listing.splash
        ? `/${pathSettings.staticAssetPath}/${listing.splash}`
        : undefined,
  },
  attributes: [
    ['name', 'listingName'],
    ['name', 'listingTitle'], // TODO: Deduplicate with the one above
    ['description', 'listingDescription'],
    ['splashUrl', 'listingImage'],
    ['sublinks', 'listingSublinks'],
    ['seoDescription', 'pageDescription'],
  ],
};
