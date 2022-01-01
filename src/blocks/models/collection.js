export const collection = {
  name: 'Collection',
  fields: [
    { name: 'name', type: 'stringRequired' },
    { name: 'slug', type: 'stringRequired' },
    { name: 'featured', type: 'booleanRequired' },
    { name: 'icon', type: 'stringRequired' },
    { name: 'splash', type: 'stringRequired' },
    { name: 'description', type: 'stringRequired' },
    { name: 'shortDescription', type: 'stringRequired' },
  ],
  lazyProperties: {
    listing: ({ models: { Listing } }) => collection =>
      Listing.records.get(`collection/${collection.slug}`),
  },
  cacheProperties: ['listing'],
};
