import pathSettings from 'settings/paths';

export const snippetPreviewSerializer = {
  name: 'SnippetPreviewSerializer',
  methods: {
    description: (snippet, { withSearch } = {}) => {
      if (withSearch) return undefined;
      return snippet.descriptionHtml
        .trim()
        .replace('<p>', '')
        .replace('</p>', '')
        .replace(/<a.*?>(.*?)<\/a>/g, '$1');
    },
    searchTokens: (snippet, { withSearch } = {}) =>
      withSearch ? snippet.searchTokens : undefined,
    searchResultTag: (snippet, { withSearch } = {}) =>
      withSearch ? snippet.formattedMiniPreviewTag : undefined,
    previewUrl: (snippet, { withSearch } = {}) => {
      if (withSearch) return undefined;
      return snippet.cover
        ? `/${pathSettings.staticAssetPath}/preview/${snippet.cover}.jpg`
        : undefined;
    },
    dateFormatted: (snippet, { withSearch } = {}) => {
      if (withSearch) return undefined;
      return snippet.dateModified.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    },
    type: () => 'snippet',
  },
  attributes: [
    'title',
    'shortTitle',
    ['slug', 'url'],
    'description',
    ['formattedPreviewTags', 'tags'],
    ['dateFormatted', 'extraContext'],
    'searchTokens',
    'searchResultTag',
    'type',
    ['previewUrl', 'cover'],
  ],
};
