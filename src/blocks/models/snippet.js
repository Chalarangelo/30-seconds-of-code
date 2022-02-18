import path from 'path';
import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from 'utils';
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
    { name: 'type', type: 'stringRequired' },
    { name: 'shortText', type: 'stringRequired' },
    { name: 'fullText', type: 'stringRequired' },
    { name: 'html', type: 'object' },
    { name: 'htmlCode', type: 'string' },
    { name: 'cssCode', type: 'string' },
    { name: 'scopedCssCode', type: 'string' },
    { name: 'jsCode', type: 'string' },
    { name: 'styleCode', type: 'string' },
    { name: 'srcCode', type: 'string' },
    { name: 'exampleCode', type: 'string' },
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
    primaryTag: snippet => snippet.tags[0],
    truePrimaryTag: snippet => {
      if (!snippet.isBlog) return snippet.primaryTag;
      const language = snippet.language;
      if (!language) return snippet.primaryTag;
      return snippet.tags.filter(t => t !== language.id)[0];
    },
    strippedDescription: snippet => stripMarkdownFormat(snippet.shortText),
    formattedPrimaryTag: snippet => literals.tag(snippet.truePrimaryTag),
    // Used for snippet previews in search autocomplete
    formattedMiniPreviewTag: snippet =>
      snippet.isBlog && !snippet.language
        ? literals.blogSingular
        : snippet.language.name,
    formattedTags: snippet => {
      let tags = snippet.tags
        .filter(tag => !expertiseLevels.includes(tag))
        .map(literals.tag);
      if (!snippet.isBlog) tags.unshift(snippet.language.name);
      return tags.join(', ');
    },
    formattedPreviewTags: snippet => {
      if (snippet.language)
        return [snippet.language.name, snippet.formattedPrimaryTag].join(', ');
      else return snippet.formattedPrimaryTag;
    },
    hasOtherLanguages: snippet =>
      snippet.repository.otherLanguages &&
      snippet.repository.otherLanguages.length > 0,
    isBlog: snippet => snippet.type.startsWith('blog'),
    isCSS: snippet => snippet.repository.isCSS,
    isReact: snippet => snippet.repository.isReact,
    isReactHook: snippet =>
      snippet.repository.isReact && snippet.primaryTag === 'hooks',
    slug: snippet => `/${snippet.id}`,
    titleSlug: snippet => convertToSeoSlug(snippet.title),
    fileSlug: snippet => convertToSeoSlug(snippet.fileName.slice(0, -3)),
    url: snippet => `${snippet.repository.repoUrlPrefix}/${snippet.fileName}`,
    vscodeUrl: snippet =>
      `vscode://file/${path.resolve(
        snippet.repository.vscodeUrlPrefix,
        snippet.fileName
      )}`,
    actionType: snippet => {
      if (snippet.isBlog) return undefined;
      if (snippet.isCSS || snippet.isReact) return 'codepen';
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
            ...tokenizeSnippet(
              stripMarkdownFormat(`${snippet.shortText} ${snippet.title}`)
            ),
          ]
        : [
            snippet.fileName.slice(0, -3),
            snippet.repository.language.short,
            snippet.repository.language.long,
            ...snippet.tags.filter(tag => !expertiseLevels.includes(tag)),
            ...tokenizeSnippet(
              stripMarkdownFormat(`${snippet.shortText} ${snippet.title}`)
            ),
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
            ? literals.blog
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
      if (snippet.isBlog) {
        const lang = Language.records.full.find(l =>
          snippet.tags.includes(l.id)
        );
        return lang
          ? lang.getTagIcon(snippet.truePrimaryTag)
          : snippet.repository.icon;
      }
      return snippet.language.getTagIcon(snippet.primaryTag);
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
    'titleSlug',
    'fileSlug',
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
