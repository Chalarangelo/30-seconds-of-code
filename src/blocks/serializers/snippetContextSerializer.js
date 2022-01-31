import { stripMarkdownFormat } from 'utils';
import pathSettings from 'settings/paths';

export const snippetContextSerializer = {
  name: 'SnippetContextSerializer',
  methods: {
    description: snippet => stripMarkdownFormat(snippet.text.short),
    code: snippet => (snippet.isCSS ? snippet.code : undefined),
    authors: snippet =>
      snippet.isBlog
        ? snippet.authors.flatMap(({ name, profile }) => ({
            name,
            profile,
          }))
        : undefined,
    type: snippet => (snippet.isBlog ? snippet.type : undefined),
    vscodeUrl: (snippet, { withVscodeUrl } = {}) =>
      withVscodeUrl ? snippet.vscodeUrl : undefined,
    coverUrl: snippet =>
      snippet.cover
        ? `/${pathSettings.staticAssetPath}/${snippet.cover}`
        : undefined,
    dateFormatted: snippet =>
      snippet.lastUpdated.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    fullDescription: snippet => snippet.html.fullDescription,
  },
  attributes: [
    'id',
    'title',
    'description',
    'fullDescription',
    'codeBlocks',
    'url',
    'slug',
    ['dateFormatted', 'date'],
    'expertise',
    'icon',
    ['formattedTags', 'tags'],
    'html',
    'actionType',
    'code',
    'authors',
    'type',
    ['coverUrl', 'cover'],
    'vscodeUrl',
  ],
};
