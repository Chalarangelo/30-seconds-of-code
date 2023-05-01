export const searchResultSerializer = {
  name: 'SearchResultSerializer',
  methods: {
    // TODO: This is quite a dirty hack to keep things consistent as before, but
    // it needs a reiteration.
    title: (item, { type }) =>
      type === 'snippet'
        ? item.shortTitle
        : item.shortName.replace(/ Snippets$/g, ''),
    tag: (item, { type }) =>
      type === 'snippet'
        ? item.formattedMiniPreviewTag
        : item.formattedSnippetCount,
    type: (item, { type }) => type,
  },
  attributes: ['title', ['slug', 'url'], 'tag', 'searchTokens', 'type'],
};
