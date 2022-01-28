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
    firstSeenFormatted: snippet =>
      snippet.firstSeen.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
  },
  attributes: [
    'id',
    'title',
    'description',
    'url',
    'slug',
    ['firstSeenFormatted', 'firstSeen'],
    'expertise',
    ['formattedLanguages', 'language'],
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
