export const snippetPreviewSerializer = {
  name: 'SnippetPreviewSerializer',
  methods: {
    description: snippet => snippet.html.description.trim(),
    language: snippet =>
      snippet.repository.language
        ? snippet.repository.language.name
        : undefined,
    searchTokens: (snippet, { withSearchTokens } = {}) =>
      withSearchTokens ? snippet.searchTokens : undefined,
  },
  attributes: [
    'title',
    ['slug', 'url'],
    'icon',
    'description',
    'searchTokens',
    'expertise',
    ['formattedPrimaryTag', 'primaryTag'],
    'language',
  ],
};
