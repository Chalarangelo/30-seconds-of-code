import pathSettings from 'settings/paths';

export const listingContextSerializer = {
  name: 'ListingContextSerializer',
  methods: {
    splashUrl: listing =>
      listing.splash
        ? `/${pathSettings.staticAssetPath}/splash/${listing.splash}`
        : `/${pathSettings.staticAssetPath}/splash/laptop-view.png`,
    coverUrl: listing =>
      listing.splash
        ? `/${
            pathSettings.staticAssetPath
          }/splash_cover/${listing.splash.replace('.png', '.jpg')}`
        : `/${pathSettings.staticAssetPath}/splash_cover/laptop-view.jpg`,
  },
  attributes: [
    ['name', 'listingName'],
    ['description', 'listingDescription'],
    ['splashUrl', 'listingImage'],
    ['coverUrl', 'listingCover'],
    ['sublinks', 'listingSublinks'],
    ['seoDescription', 'pageDescription'],
  ],
};
