import pathSettings from 'settings/paths';

export const snippetContextSerializer = {
  name: 'SnippetContextSerializer',
  methods: {
    code: snippet => snippet.code || undefined,
    author: snippet =>
      snippet.author ? snippet.author.contextObject : undefined,
    coverUrl: snippet =>
      `/${pathSettings.staticAssetPath}/cover/${snippet.cover}.jpg`,
    fullDescription: snippet => snippet.fullDescriptionHtml,
  },
  attributes: [
    'title',
    'fullDescription',
    'url',
    'slug',
    ['dateFormatted', 'date'],
    ['formattedTags', 'tags'],
    'actionType',
    'code',
    'author',
    ['coverUrl', 'cover'],
  ],
};
