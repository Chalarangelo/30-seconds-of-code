import pathSettings from '#settings/paths';
import presentationSettings from '#settings/presentation';

const { coverImageDimensions, coverImageStandardSuffix } = presentationSettings;

export const snippetContextSerializer = {
  name: 'SnippetContextSerializer',
  methods: {
    code: snippet => snippet.code || undefined,
    coverUrl: snippet =>
      `/${pathSettings.staticAssetPath}/cover/${snippet.cover}${coverImageStandardSuffix}.webp`,
    coverSrcset: snippet =>
      coverImageDimensions.map(
        ({ width }) =>
          `/${pathSettings.staticAssetPath}/cover/${snippet.cover}-${width}.webp ${width}w`
      ),
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
    'coverSrcset',
    'githubUrl',
    ['tableOfContentsHtml', 'tableOfContents'],
  ],
};
