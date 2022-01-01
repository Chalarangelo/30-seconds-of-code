import pathSettings from 'settings/paths';

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
    { name: 'icon', type: 'string' },
    { name: 'splash', type: 'stringRequired' },
    { name: 'description', type: 'stringRequired' },
    { name: 'shortDescription', type: 'stringRequired' },
    {
      name: 'cardTemplate',
      type: 'enumRequired',
      values: ['StandardSnippetCard', 'CssSnippetCard', 'BlogSnippetCard'],
      defaultValue: 'StandardSnippetCard',
    },
    {
      name: 'biasPenaltyMultiplier',
      type: 'numberRequired',
      defaultValue: 1.0,
      validators: {
        min: 1.0,
      },
    },
    {
      name: 'images',
      type: 'object',
      validators: {
        containsCorrectKeys: value => {
          if (!value) return true;
          const keys = Object.keys(value);
          if (keys.length === 0) return true;
          const requiredKeys = ['name', 'path'];
          return requiredKeys.every(key => keys.includes(key));
        },
      },
    },
  ],
  properties: {
    sourceDir: repo => `${repo.dirName}/${repo.snippetPath}`,
    slugPrefix: repo => `${repo.slug}/s`,
    repoUrlPrefix: repo => `${repo.repoUrl}/blob/master/${repo.snippetPath}`,
    vscodeUrlPrefix: repo =>
      `${pathSettings.rawContentPath}/sources/${repo.sourceDir}`,
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
    withImages: repo => repo.images && repo.images.name && repo.images.path,
  },
};
