import pathSettings from 'settings/paths';

export const snippetContextSerializer = {
  name: 'SnippetContextSerializer',
  methods: {
    code: snippet => snippet.code || undefined,
    author: snippet =>
      snippet.author
        ? {
            name: snippet.author.name,
            intro: snippet.author.intro,
            github: snippet.author.github,
          }
        : undefined,
    type: snippet => (snippet.isBlog ? snippet.type : undefined),
    coverUrl: snippet =>
      snippet.cover
        ? `/${pathSettings.staticAssetPath}/cover/${snippet.cover}.jpg`
        : undefined,
    dateFormatted: snippet =>
      snippet.dateModified.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
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
