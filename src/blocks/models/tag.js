export const tag = {
  name: 'Tag',
  fields: [
    { name: 'name', type: 'stringRequired' },
    { name: 'shortName', type: 'stringRequired' },
    { name: 'description', type: 'stringRequired' },
    { name: 'shortDescription', type: 'stringRequired' },
    { name: 'splash', type: 'stringRequired' },
    { name: 'icon', type: 'string' },
    { name: 'slugPrefix', type: 'stringRequired' },
  ],
  properties: {
    isBlogTag: tag => tag.id.startsWith('blog_'),
    shortId: tag => tag.id.split('_')[1],
    language: tag => tag.repository.language,
    featured: tag => tag.repository.featured,
  },
  lazyProperties: {
    listing: ({ models: { Listing } }) => tag =>
      Listing.records.get(`tag${tag.slugPrefix}`),
  },
};
