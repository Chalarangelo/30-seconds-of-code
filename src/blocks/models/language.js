export const language = {
  name: 'Language',
  fields: [
    { name: 'long', type: 'stringRequired' },
    { name: 'short', type: 'stringRequired' },
    { name: 'name', type: 'stringRequired' },
  ],
  properties: {
    slugPrefix: language =>
      language.repository ? `/${language.repository.slug}` : null,
    tagShortIds: language =>
      language.repository ? language.repository.tags.flatPluck('shortId') : [],
  },
  cacheProperties: ['slugPrefix', 'tagShortIds'],
  scopes: {
    // Hacky way to exclude the HTML language from the list
    full: language => language.id !== 'html',
  },
};
