import pathSettings from 'settings/paths';

export const previewSerializer = {
  name: 'PreviewSerializer',
  methods: {
    title: (item, { type }) =>
      type === 'snippet' ? item.title : item.shortName,
    description: item => item.formattedDescription,
    cover: (item, { type }) => {
      if (type === 'snippet')
        return `/${pathSettings.staticAssetPath}/preview/${item.cover}.jpg`;
      return item.splash
        ? `/${pathSettings.staticAssetPath}/splash/${item.splash}`
        : `/${pathSettings.staticAssetPath}/splash/laptop-view.png`;
    },
    url: (item, { type }) =>
      type === 'snippet' ? item.slug : item.firstPageSlug,
    tags: (item, { type }) =>
      type === 'snippet' ? item.formattedPreviewTags : 'Collection',
    extraContext: (item, { type }) =>
      type === 'snippet' ? item.dateFormatted : item.formattedSnippetCount,
  },
  attributes: ['title', 'description', 'url', 'cover', 'tags', 'extraContext'],
};
