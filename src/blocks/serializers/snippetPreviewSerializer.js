export const snippetPreviewSerializer = {
  name: 'SnippetPreviewSerializer',
  methods: {
    description: snippet => snippet.html.description.trim(),
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
