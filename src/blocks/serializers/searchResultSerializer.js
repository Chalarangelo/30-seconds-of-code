export const searchResultSerializer = {
  name: 'SearchResultSerializer',
  methods: {
    title: (item, { type }) =>
      type === 'snippet' ? item.shortTitle : item.shortName,
    url: (item, { type }) =>
      type === 'snippet' ? item.slug : item.firstPageSlug,
    tag: (item, { type }) =>
      type === 'snippet'
        ? item.formattedMiniPreviewTag
        : item.formattedSnippetCount,
    type: (item, { type }) => type,
  },
  attributes: ['title', 'url', 'tag', 'searchTokens', 'type'],
};
