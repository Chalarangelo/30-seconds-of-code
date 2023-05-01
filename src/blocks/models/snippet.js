import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from 'utils';
import { Ranker } from 'blocks/utilities/ranker';
import { Recommender } from 'blocks/utilities/recommender';
import tokenizeSnippet from 'utils/search';
import literals from 'lang/en';

export const snippet = {
  name: 'Snippet',
  fields: [
    { name: 'fileName', type: 'stringRequired' },
    { name: 'title', type: 'stringRequired' },
    { name: 'tags', type: 'stringArray' },
    { name: 'shortTitle', type: 'string' },
    { name: 'dateModified', type: 'dateRequired' },
    { name: 'listed', type: 'booleanRequired' },
    { name: 'type', type: 'stringRequired' },
    { name: 'shortText', type: 'stringRequired' },
    { name: 'fullText', type: 'stringRequired' },
    { name: 'descriptionHtml', type: 'string' },
    { name: 'fullDescriptionHtml', type: 'string' },
    { name: 'code', type: 'object' },
    { name: 'cover', type: 'stringRequired' },
    { name: 'seoDescription', type: 'stringRequired' },
  ],
  properties: {
    seoTitle: snippet => {
      if (!snippet.language) return snippet.title;
      if (snippet.title.includes(snippet.language.name)) return snippet.title;
      return `${snippet.language.name} - ${snippet.title}`;
    },
    primaryTag: snippet => snippet.tags[0],
    truePrimaryTag: snippet => {
      if (!snippet.isBlog) return snippet.primaryTag;
      const language = snippet.language;
      if (!language) return snippet.primaryTag;
      return snippet.tags.filter(t => t !== language.id)[0];
    },
    formattedPrimaryTag: snippet => literals.tag(snippet.truePrimaryTag),
    // Used for snippet previews in search autocomplete
    formattedMiniPreviewTag: snippet =>
      snippet.isBlog && !snippet.language ? 'Article' : snippet.language.name,
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
    isBlog: snippet => snippet.type !== 'snippet',
    slug: snippet => `/${snippet.id}`,
    fileSlug: snippet => convertToSeoSlug(snippet.fileName.slice(0, -3)),
    url: snippet => `${snippet.repository.repoUrlPrefix}/${snippet.fileName}`,
    actionType: snippet => (snippet.code ? 'codepen' : undefined),
    isScheduled: snippet => snippet.dateModified > new Date(),
    isPublished: snippet => !snippet.isScheduled,
    isListed: snippet =>
      snippet.repository.featured && snippet.listed && !snippet.isScheduled,
    ranking: snippet => Ranker.rankIndexableContent(snippet.indexableContent),
    dateFormatted: snippet =>
      snippet.dateModified.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    searchTokensArray: snippet => {
      const tokenizableElements = [
        snippet.fileName.slice(0, -3),
        ...snippet.tags,
        ...tokenizeSnippet(
          stripMarkdownFormat(`${snippet.shortText} ${snippet.title}`)
        ),
        // Normalized title tokens, without stopword removal for special matches
        // e.g. "this" in a relevant JS article needs to be matched when queried
        ...snippet.title
          .toLowerCase()
          .trim()
          .split(/[^a-z0-9\-']+/i),
      ];
      if (snippet.language)
        tokenizableElements.push(snippet.language.short, snippet.language.long);

      return uniqueElements(tokenizableElements.map(v => v.toLowerCase()));
    },
    searchTokens: snippet => snippet.searchTokensArray.join(' '),
    // TODO: This is still broken, check a DS snippet
    primaryTagCollection: snippet => {
      if (snippet.language) {
        // Language slug prefix has a leading `/`
        const primaryTagCollectionId =
          `${snippet.language.slugPrefix}/${snippet.truePrimaryTag}`.slice(1);
        const collection = snippet.collections.get(primaryTagCollectionId);
        if (collection) return collection;
      }

      if (snippet.hasCollection) {
        const parentedCollection = snippet.collections.withParent.first;
        if (parentedCollection) return parentedCollection;
      }
    },
    breadcrumbs: snippet => {
      const homeCrumb = {
        url: '/',
        name: 'Home',
      };

      const languageCrumb =
        snippet.language && snippet.language.id !== 'html'
          ? {
              url: `${snippet.language.slugPrefix}/p/1`,
              name: snippet.language.name,
            }
          : {
              url: `/articles/p/1`,
              name: literals.blog,
            };

      let tagCrumb = null;

      if (snippet.primaryTagCollection)
        tagCrumb = {
          url: `/${snippet.primaryTagCollection.slug}/p/1`,
          name: snippet.primaryTagCollection.shortName,
        };

      const snippetCrumb = {
        url: snippet.slug,
        name: snippet.shortTitle,
      };

      return [homeCrumb, languageCrumb, tagCrumb, snippetCrumb].filter(Boolean);
    },
    hasCollection: snippet =>
      Boolean(snippet.collections && snippet.collections.length),
    recommendedCollection: snippet =>
      snippet.hasCollection && !snippet.collections.first.listing.parent
        ? snippet.collections.first
        : null,
    indexableContent: snippet =>
      [
        snippet.title,
        ...snippet.tags,
        (snippet.language && snippet.language.long) || '',
        snippet.type || '',
        snippet.fullText || '',
        snippet.shortText || '',
      ]
        .join(' ')
        .toLowerCase(),
  },
  lazyProperties: {
    language:
      ({ models: { Language } }) =>
      snippet => {
        if (!snippet.isBlog) return snippet.repository.language;
        for (let tag of snippet.tags) {
          const lang = Language.records.get(tag);
          if (lang) return lang;
        }
        return null;
      },
    recommendedSnippets:
      ({ models: { Snippet } }) =>
      snippet => {
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
    'isListed',
    'isScheduled',
    'isPublished',
    'dateFormatted',
    'searchTokensArray',
    'searchTokens',
    'language',
    'primaryTag',
    'truePrimaryTag',
    'primaryTagCollection',
    'formattedPrimaryTag',
    'fileSlug',
    'seoTitle',
  ],
  scopes: {
    snippets: snippet => snippet.type === 'snippet',
    blogs: snippet => snippet.type !== 'snippet',
    listed: snippet => snippet.isListed,
    listedByPopularity: {
      matcher: snippet => snippet.isListed,
      sorter: (a, b) => b.ranking - a.ranking,
    },
    listedByNew: {
      matcher: snippet => snippet.isListed,
      sorter: (a, b) => b.dateModified - a.dateModified,
    },
    unlisted: snippet => !snippet.isListed,
    scheduled: snippet => snippet.isScheduled,
    published: snippet => snippet.isPublished,
  },
};
