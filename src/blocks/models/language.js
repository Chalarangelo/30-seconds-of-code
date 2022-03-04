export const language = {
  name: 'Language',
  fields: [
    { name: 'long', type: 'stringRequired' },
    { name: 'short', type: 'stringRequired' },
    { name: 'name', type: 'stringRequired' },
    { name: 'icon', type: 'string' },
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
  lazyMethods: {
    getTagIcon: ({ models: { Tag } }) => (language, tag) => {
      if (!language.repositories || !language.repositories.length)
        return language.icon;
      const tagRec = Tag.records.get(
        `${language.repositories.first.id}_${tag}`
      );
      if (!tagRec || !tagRec.icon) return language.icon;
      return tagRec.icon;
    },
  },
  cacheProperties: ['mainRepository', 'slugPrefix', 'tagShortIds'],
  scopes: {
    // Hacky way to exclude the HTML language from the list
    full: language => language.icon,
  },
};
