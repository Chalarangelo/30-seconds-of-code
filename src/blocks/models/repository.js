export const repository = {
  name: 'Repository',
  fields: [
    { name: 'name', type: 'stringRequired' },
    { name: 'dirName', type: 'stringRequired' },
    { name: 'repoUrl', type: 'stringRequired' },
    { name: 'snippetPath', type: 'stringRequired' },
    { name: 'slug', type: 'stringRequired' },
    { name: 'isBlog', type: 'booleanRequired', defaultValue: false },
    { name: 'featured', type: 'booleanRequired' },
    { name: 'splash', type: 'stringRequired' },
    { name: 'description', type: 'stringRequired' },
    { name: 'shortDescription', type: 'stringRequired' },
    {
      name: 'biasPenaltyMultiplier',
      type: 'numberRequired',
      defaultValue: 1.0,
      validators: {
        min: 1.0,
      },
    },
  ],
  properties: {
    slugPrefix: repo => `${repo.slug}/s`,
    repoUrlPrefix: repo => `${repo.repoUrl}/blob/master/${repo.snippetPath}`,
    isCSS: repo => repo.id === '30css',
    isReact: repo => repo.id === '30react',
  },
  lazyProperties: {
    listing: ({ models: { Listing } }) => repo => {
      const type = repo.isBlog ? 'blog' : 'language';
      const listingId = `${type}/${repo.slug}`;
      return Listing.records.get(listingId);
    },
  },
  cacheProperties: ['isCSS', 'isReact', 'listing'],
  scopes: {
    css: repo => repo.isCSS,
    react: repo => repo.isReact,
    blog: repo => repo.isBlog,
  },
};
