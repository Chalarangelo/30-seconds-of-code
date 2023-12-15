import pathSettings from '#settings/paths';

export const snippetContextSerializer = {
  name: 'SnippetContextSerializer',
  methods: {
    code: snippet => snippet.code || undefined,
    coverUrl: snippet =>
      `/${pathSettings.staticAssetPath}/cover/${snippet.cover}.jpg`,
    fullDescription: snippet => snippet.fullDescriptionHtml,
  },
  attributes: [
    'title',
    'fullDescription',
    'slug',
    ['dateFormatted', 'date'],
    ['dateMachineFormatted', 'dateTime'],
    ['formattedTags', 'tags'],
    ['coverUrl', 'cover'],
  ],
};
