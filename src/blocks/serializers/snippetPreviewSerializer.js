export const snippetPreviewSerializer = {
  name: 'SnippetPreviewSerializer',
  methods: {
    description: snippet => snippet.descriptionHtml.trim(),
    searchTokens: (snippet, { withSearch } = {}) =>
      withSearch ? snippet.searchTokens : undefined,
    searchResultTag: (snippet, { withSearch } = {}) =>
      withSearch ? snippet.formattedMiniPreviewTag : undefined,
  },
  attributes: [
    'title',
    ['slug', 'url'],
    'icon',
    'description',
    ['formattedPreviewTags', 'tags'],
    'searchTokens',
    'searchResultTag',
    'expertise',
  ],
};
