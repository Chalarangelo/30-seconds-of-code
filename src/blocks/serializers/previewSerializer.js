import pathSettings from '#settings/paths';
import presentationSettings from '#settings/presentation';

const {
  coverImageSmallSuffix,
  coverImageStandardSuffix,
  splashImageSmallSuffix,
  splashImageStandardSuffix,
} = presentationSettings;

export const previewSerializer = {
  name: 'PreviewSerializer',
  methods: {
    title: (item, { type }) =>
      type === 'snippet' ? item.title : item.shortName,
    description: item => item.formattedDescription,
    cover: (item, { type }) => {
      if (type === 'snippet')
        return `/${pathSettings.staticAssetPath}/cover/${item.cover}${coverImageSmallSuffix}.webp`;
      return `/${pathSettings.staticAssetPath}/splash/${item.splash}${splashImageStandardSuffix}.webp`;
    },
    coverSrcset: (item, { type }) => {
      if (type === 'snippet')
        return [
          `/${pathSettings.staticAssetPath}/cover/${item.cover}${coverImageSmallSuffix}.webp 400w`,
          `/${pathSettings.staticAssetPath}/cover/${item.cover}${coverImageStandardSuffix}.webp 800w`,
        ];
      return [
        `/${pathSettings.staticAssetPath}/splash/${item.splash}${splashImageSmallSuffix}.webp 400w`,
        `/${pathSettings.staticAssetPath}/splash/${item.splash}${splashImageStandardSuffix}.webp 600w`,
      ];
    },
    url: (item, { type }) =>
      type === 'snippet' ? item.slug : item.firstPageSlug,
    tags: (item, { type }) =>
      type === 'snippet' ? item.formattedPreviewTags : 'Collection',
    extraContext: (item, { type }) =>
      type === 'snippet' ? item.dateFormatted : item.formattedSnippetCount,
    dateTime: (item, { type }) =>
      type === 'snippet' ? item.dateMachineFormatted : undefined,
  },
  attributes: [
    'title',
    'description',
    'url',
    'cover',
    'coverSrcset',
    'tags',
    'extraContext',
    'dateTime',
  ],
};
