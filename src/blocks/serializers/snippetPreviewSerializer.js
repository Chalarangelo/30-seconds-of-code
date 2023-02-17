import pathSettings from 'settings/paths';

export const snippetPreviewSerializer = {
  name: 'SnippetPreviewSerializer',
  methods: {
    description: snippet =>
      snippet.descriptionHtml.trim().replace('<p>', '').replace('</p>', ''),
    searchTokens: (snippet, { withSearch } = {}) =>
      withSearch ? snippet.searchTokens : undefined,
    searchResultTag: (snippet, { withSearch } = {}) =>
      withSearch ? snippet.formattedMiniPreviewTag : undefined,
    previewTitle: (snippet, { withSearch }) => {
      if (!withSearch) return undefined;
      return snippet.shortTitle;
    },
    previewUrl: snippet =>
      snippet.cover
        ? `/${pathSettings.staticAssetPath}/preview/${snippet.cover}.jpg`
        : undefined,
    type: () => 'snippet',
  },
  attributes: [
    'title',
    'shortTitle',
    ['slug', 'url'],
    'description',
    ['formattedPreviewTags', 'tags'],
    'searchTokens',
    'searchResultTag',
    'type',
    ['previewUrl', 'cover'],
  ],
};
