import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from 'utils';
import { Ranker } from 'blocks/utilities/ranker';
import { Recommender } from 'blocks/utilities/recommender';
import tokenizeSnippet from 'utils/search';
import clientLiterals from 'lang/en/client/common';
import literals from 'lang/en';

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
    { name: 'shortTitle', type: 'string' },
    { name: 'firstSeen', type: 'dateRequired' },
    { name: 'lastUpdated', type: 'dateRequired' },
    { name: 'listed', type: 'booleanRequired' },
    { name: 'type', type: 'stringRequired' },
    { name: 'shortText', type: 'stringRequired' },
    { name: 'fullText', type: 'stringRequired' },
    { name: 'descriptionHtml', type: 'string' },
    { name: 'fullDescriptionHtml', type: 'string' },
    { name: 'htmlCodeBlockHtml', type: 'string' },
    { name: 'cssCodeBlockHtml', type: 'string' },
    { name: 'scopedCssCodeBlockHtml', type: 'string' },
    { name: 'jsCodeBlockHtml', type: 'string' },
    { name: 'styleCodeBlockHtml', type: 'string' },
    { name: 'srcCodeBlockHtml', type: 'string' },
    { name: 'exampleCodeBlockHtml', type: 'string' },
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
      let tags = snippet.tags.map(literals.tag);
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
    slug: snippet => `/${snippet.id}`,
    titleSlug: snippet => convertToSeoSlug(snippet.title),
    fileSlug: snippet => convertToSeoSlug(snippet.fileName.slice(0, -3)),
    url: snippet => `${snippet.repository.repoUrlPrefix}/${snippet.fileName}`,
    actionType: snippet => {
      if (snippet.isBlog) return undefined;
      if (snippet.isCSS || snippet.isReact) return 'codepen';
      return 'copy';
    },
    isScheduled: snippet => snippet.firstSeen > new Date(),
    isPublished: snippet => !snippet.isScheduled,
    isListed: snippet =>
      snippet.repository.featured && snippet.listed && !snippet.isScheduled,
    ranking: snippet => Ranker.rankSnippet(snippet),
    searchTokensArray: snippet => {
      const tokenizableElements = snippet.isBlog
        ? [
            ...snippet.tags,
            ...tokenizeSnippet(
              stripMarkdownFormat(`${snippet.shortText} ${snippet.title}`)
            ),
          ]
        : [
            snippet.fileName.slice(0, -3),
            snippet.repository.language.short,
            snippet.repository.language.long,
            ...snippet.tags,
            ...tokenizeSnippet(
              stripMarkdownFormat(`${snippet.shortText} ${snippet.title}`)
            ),
          ];
      return uniqueElements(tokenizableElements.map(v => v.toLowerCase()));
    },
    searchTokens: snippet => snippet.searchTokensArray.join(' '),
    breadcrumbs: snippet => {
      const homeCrumb = {
        url: '/',
        name: clientLiterals.home,
      };

      const languageCrumb = snippet.language
        ? {
            url: `${snippet.language.slugPrefix}/p/1`,
            name: snippet.language.name,
          }
        : {
            url: `/articles/p/1`,
            name: literals.blog,
          };

      let tagCrumb = null;
      if (!snippet.isBlog) {
        tagCrumb = {
          url: `${
            snippet.language.slugPrefix
          }/t/${snippet.primaryTag.toLowerCase()}/p/1`,
          name: literals.tag(snippet.primaryTag),
        };
      } else if (
        snippet.hasCollection &&
        snippet.collections.first.listing.parent
      ) {
        // TODO: Make this smarter to account for multiple collections
        tagCrumb = {
          url: `/${snippet.collections.first.slug}/p/1`,
          name: snippet.collections.first.shortName,
        };
      } else if (
        snippet.language &&
        snippet.truePrimaryTag &&
        snippet.language.tagShortIds.includes(
          snippet.truePrimaryTag.toLowerCase()
        )
      ) {
        tagCrumb = {
          url: `${
            snippet.language.slugPrefix
          }/t/${snippet.truePrimaryTag.toLowerCase()}/p/1`,
          name: literals.tag(snippet.truePrimaryTag),
        };
      }

      const snippetCrumb = {
        url: snippet.slug,
        name: snippet.shortTitle,
      };

      return [homeCrumb, languageCrumb, tagCrumb, snippetCrumb].filter(Boolean);
    },
    codeBlocks: snippet => {
      if (snippet.isBlog) return [];
      if (snippet.isCSS) {
        let blocks = [
          {
            language: { short: 'html', long: 'HTML' },
            htmlContent: snippet.htmlCodeBlockHtml,
          },
          {
            language: { short: 'css', long: 'CSS' },
            htmlContent: snippet.cssCodeBlockHtml,
          },
        ];
        if (snippet.jsCodeBlockHtml)
          blocks.push({
            language: { short: 'js', long: 'JavaScript' },
            htmlContent: snippet.jsCodeBlockHtml,
          });
        return blocks;
      }
      let blocks = [
        {
          language: {
            short: snippet.language.short,
            long: snippet.language.name,
          },
          htmlContent: snippet.srcCodeBlockHtml,
        },
        {
          language: {
            short: snippet.language.short,
            long: literals.examples,
          },
          htmlContent: snippet.exampleCodeBlockHtml,
        },
      ];
      if (snippet.styleCodeBlockHtml)
        blocks.splice(1, 0, {
          language: { short: 'css', long: 'CSS' },
          htmlContent: snippet.styleCodeBlockHtml,
        });
      return blocks;
    },
    hasCollection: snippet =>
      Boolean(snippet.collections && snippet.collections.length),
    recommendedCollection: snippet =>
      snippet.hasCollection && !snippet.collections.first.listing.parent
        ? snippet.collections.first
        : null,
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
