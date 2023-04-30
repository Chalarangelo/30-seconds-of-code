export const searchResultSerializer = {
  name: 'SearchResultSerializer',
  methods: {
    title: (item, { type }) =>
      type === 'snippet' ? item.shortTitle : item.shortName,
    tag: (item, { type }) =>
      type === 'snippet'
        ? item.formattedMiniPreviewTag
        : item.formattedSnippetCount,
    type: (item, { type }) => type,
  },
  attributes: ['title', ['slug', 'url'], 'tag', 'searchTokens', 'type'],
};
