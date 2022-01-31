import path from 'path';
import { convertToSeoSlug, uniqueElements } from 'utils';
import { Ranker } from 'blocks/utilities/ranker';
import { Recommender } from 'blocks/utilities/recommender';
import tokenizeSnippet from 'utils/search';
import clientLiterals from 'lang/en/client/common';
import literals from 'lang/en';

const expertiseLevels = ['beginner', 'intermediate', 'advanced', 'article'];

export const snippet = {
  name: 'Snippet',
  fields: [
    { name: 'fileName', type: 'stringRequired' },
    {
      name: 'title',
      type: 'stringRequired',
    },
    {
      name: 'tags',
      type: 'stringArray',
      validators: {
        minLength: 1,
        uniqueValues: true,
      },
    },
    { name: 'firstSeen', type: 'dateRequired' },
    { name: 'lastUpdated', type: 'dateRequired' },
    { name: 'listed', type: 'booleanRequired' },
    {
      name: 'type',
      type: 'stringRequired',
      validators: {
        isBlogTypeOrSnippet: value => {
          return value.startsWith('blog') || value === 'snippet';
        },
      },
    },
    {
      name: 'text',
      type: 'object',
      validators: {
        containsAllTexts: value => {
          return ['full', 'short'].every(key => value[key]);
        },
      },
    },
    {
      name: 'html',
      type: 'object',
      validators: {
        hasDescriptionKeys: value =>
          ['fullDescription', 'description'].every(key => value[key]),
      },
    },
    { name: 'code', type: 'object' },
    { name: 'cover', type: 'string' },
    { name: 'seoDescription', type: 'stringRequired' },
  ],
  validators: {
    updatedAfterSeen: snippet => snippet.lastUpdated >= snippet.firstSeen,
    blogHasCover: snippet => (snippet.isBlog ? Boolean(snippet.cover) : true),
    blogHasAuthor: snippet =>
      snippet.isBlog ? snippet.authors && snippet.authors.length : true,
  },
  properties: {
    cardTemplate: snippet => snippet.repository.cardTemplate,
    primaryTag: snippet => snippet.tags[0],
    truePrimaryTag: snippet => {
      if (!snippet.isBlog) return snippet.primaryTag;
      const language = snippet.language;
      if (!language) return snippet.primaryTag;
      return snippet.tags.filter(t => t !== language.id)[0];
    },
    formattedPrimaryTag: snippet => literals.tag(snippet.primaryTag),
    formattedTags: snippet =>
      snippet.tags
        .filter(tag => !expertiseLevels.includes(tag))
        .map(literals.tag),
    hasOtherLanguages: snippet =>
      snippet.repository.otherLanguages &&
      snippet.repository.otherLanguages.length > 0,
    formattedLanguages: snippet => {
      if (snippet.isBlog) return {};
      const lang = {
        short: snippet.language.short,
        long: snippet.language.name,
      };
      if (snippet.hasOtherLanguages) {
        lang.otherLanguages = snippet.repository.otherLanguages.flatMap(
          lang => ({
            short: lang.short,
            long: lang.name,
          })
        );
      }
      return lang;
    },
    isBlog: snippet => snippet.type.startsWith('blog'),
    isCSS: snippet => snippet.repository.isCSS,
    isReact: snippet => snippet.repository.isReact,
    isReactHook: snippet =>
      snippet.repository.isReact && snippet.primaryTag === 'hooks',
    slug: snippet => `/${snippet.id}`,
    titleSlug: snippet => convertToSeoSlug(snippet.title),
    url: snippet => `${snippet.repository.repoUrlPrefix}/${snippet.fileName}`,
    vscodeUrl: snippet =>
      `vscode://file/${path.resolve(
        snippet.repository.vscodeUrlPrefix,
        snippet.fileName
      )}`,
    actionType: snippet => {
      if (snippet.isBlog) return undefined;
      if (snippet.isCSS) return 'cssCodepen';
      if (snippet.isReact) return 'codepen';
      return 'copy';
    },
    expertise: snippet => {
      if (snippet.isBlog) return 'article';
      const expertiseTag = snippet.tags.find(tag =>
        expertiseLevels.includes(tag)
      );
      return expertiseTag ? expertiseTag : expertiseLevels[1];
    },
    isScheduled: snippet => snippet.firstSeen > new Date(),
    isPublished: snippet => !snippet.isScheduled,
    isListed: snippet =>
      snippet.repository.featured && snippet.listed && !snippet.isScheduled,
    ranking: snippet => Ranker.rankSnippet(snippet),
    searchTokensArray: snippet => {
      const tokenizableElements = snippet.isBlog
        ? [
            ...snippet.tags.filter(tag => !expertiseLevels.includes(tag)),
            ...tokenizeSnippet(`${snippet.text.short} ${snippet.title}`),
          ]
        : [
            ...snippet.title.split(' '),
            snippet.repository.language.short,
            snippet.repository.language.long,
            ...snippet.tags.filter(tag => !expertiseLevels.includes(tag)),
            ...tokenizeSnippet(snippet.text.short),
          ];
      return uniqueElements(tokenizableElements.map(v => v.toLowerCase()));
    },
    searchTokens: snippet => snippet.searchTokensArray.join(' '),
    breadcrumbs: snippet => {
      const slugParts = snippet.slug.split('/').filter(Boolean).slice(0, -2);
      const crumbs = [
        {
          url: '/',
          name: clientLiterals.home,
        },
        {
          url: `/${slugParts[0]}/p/1`,
          name: snippet.isBlog
            ? literals.tag('article')
            : snippet.repository.language.name,
        },
      ];

      if (!snippet.isBlog)
        crumbs.push({
          url: `/${slugParts[0]}/t/${snippet.primaryTag.toLowerCase()}/p/1`,
          name: literals.tag(snippet.primaryTag),
        });

      crumbs.push({
        url: snippet.slug,
        name: snippet.title,
      });

      return crumbs;
    },
    codeBlocks: snippet => {
      if (snippet.isBlog) return [];
      if (snippet.isCSS) {
        let blocks = [
          {
            language: { short: 'html', long: 'HTML' },
            htmlContent: snippet.html.html,
          },
          {
            language: { short: 'css', long: 'CSS' },
            htmlContent: snippet.html.css,
          },
        ];
        if (snippet.html.js)
          blocks.push({
            language: { short: 'js', long: 'JavaScript' },
            htmlContent: snippet.html.js,
          });
        return blocks;
      }
      let blocks = [
        {
          language: {
            short: snippet.language.short,
            long: snippet.language.name,
          },
          htmlContent: snippet.html.code,
        },
        {
          language: {
            short: snippet.language.short,
            long: literals.examples,
          },
          htmlContent: snippet.html.example,
        },
      ];
      if (snippet.html.style)
        blocks.unshift({
          language: { short: 'css', long: 'CSS' },
          htmlContent: snippet.html.style,
        });
      return blocks;
    },
    hasCollection: snippet =>
      Boolean(snippet.collections && snippet.collections.length),
    recommendedCollection: snippet =>
      snippet.hasCollection ? snippet.collections.first : null,
  },
  lazyProperties: {
    icon: ({ models: { Language } }) => snippet => {
      let mapped;
      if (snippet.isBlog) {
        const lang = Language.records.find(l => snippet.tags.includes(l.id));
        if (lang) {
          const tag = snippet.tags.find(t => lang.tagIcons[t]);
          mapped = tag ? tag : lang.icon;
        }
        return mapped ? mapped : snippet.repository.icon;
      }
      return snippet.language.tagIcons[snippet.primaryTag]
        ? snippet.language.tagIcons[snippet.primaryTag]
        : snippet.repository.icon;
    },
    language: ({ models: { Language } }) => snippet => {
      if (!snippet.isBlog) return snippet.repository.language;
      for (let tag of snippet.tags) {
        const lang = Language.records.get(tag);
        if (lang) return lang;
      }
      return null;
    },
    recommendedSnippets: ({ models: { Snippet } }) => snippet => {
      const recommendedSnippetIds = Recommender.recommendSnippets(
        snippet,
        Snippet.records
      );
      return Snippet.records.only(...recommendedSnippetIds);
    },
  },
  cacheProperties: [
    'ranking',
    'isBlog',
    'isCSS',
    'isReact',
    'isListed',
    'isScheduled',
    'isPublished',
    'hasOtherLanguages',
    'searchTokensArray',
    'searchTokens',
    'language',
    'icon',
    'primaryTag',
    'truePrimaryTag',
    'formattedPrimaryTag',
    'expertise',
  ],
  scopes: {
    snippets: snippet => snippet.type === 'snippet',
    blogs: snippet => snippet.type.startsWith('blog'),
    listed: snippet => snippet.isListed,
    listedByPopularity: {
      matcher: snippet => snippet.isListed,
      sorter: (a, b) => b.ranking - a.ranking,
    },
    listedByNew: {
      matcher: snippet => snippet.isListed,
      sorter: (a, b) => b.firstSeen - a.firstSeen,
    },
    unlisted: snippet => !snippet.isListed,
    scheduled: snippet => snippet.isScheduled,
    published: snippet => snippet.isPublished,
  },
};
