export const language = {
  name: 'Language',
  fields: [
    { name: 'long', type: 'stringRequired' },
    { name: 'short', type: 'stringRequired' },
    { name: 'name', type: 'stringRequired' },
  ],
  properties: {
    mainRepository: language =>
      language.repositories && language.repositories.length
        ? language.repositories.first
        : null,
    slugPrefix: language =>
      language.mainRepository ? `/${language.mainRepository.slug}` : null,
    tagShortIds: language =>
      language.mainRepository
        ? language.mainRepository.tags.flatPluck('shortId')
        : [],
  },
  cacheProperties: ['mainRepository', 'slugPrefix', 'tagShortIds'],
  scopes: {
    // Hacky way to exclude the HTML language from the list
    full: language => language.icon,
  },
};
