import pathSettings from 'settings/paths';

export const listingContextSerializer = {
  name: 'ListingContextSerializer',
  methods: {
    splashUrl: listing =>
      listing.splash
        ? `/${pathSettings.staticAssetPath}/splash/${listing.splash}`
        : `/${pathSettings.staticAssetPath}/splash/laptop-view.png`,
  },
  attributes: [
    ['name', 'listingName'],
    ['description', 'listingDescription'],
    ['splashUrl', 'listingCover'],
    ['sublinks', 'listingSublinks'],
    ['seoDescription', 'pageDescription'],
  ],
};
