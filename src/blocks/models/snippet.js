import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from 'utils';
import { Ranker } from 'blocks/utilities/ranker';
import { Recommender } from 'blocks/utilities/recommender';
import { TagFormatter } from 'blocks/utilities/tagFormatter';
import tokenizeSnippet from 'utils/search';

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
    formattedPrimaryTag: snippet => TagFormatter.format(snippet.primaryTag),
    // Used for snippet previews in search autocomplete
    formattedMiniPreviewTag: snippet =>
      snippet.language ? snippet.language.name : 'Article',
    formattedTags: snippet => {
      let tags = snippet.tags.map(TagFormatter.format);
      if (snippet.language) tags.unshift(snippet.language.name);
      return tags.join(', ');
    },
    formattedPreviewTags: snippet => {
      if (snippet.language)
        return [snippet.language.name, snippet.formattedPrimaryTag].join(', ');
      else return snippet.formattedPrimaryTag;
    },
    slug: snippet => `/${snippet.id}`,
    fileSlug: snippet => convertToSeoSlug(snippet.fileName.slice(0, -3)),
    url: snippet =>
      `https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets${snippet.slug}.md`,
    actionType: snippet => (snippet.code ? 'codepen' : undefined),
    isScheduled: snippet => snippet.dateModified > new Date(),
    isPublished: snippet => !snippet.isScheduled,
    isListed: snippet => snippet.listed && !snippet.isScheduled,
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
    orderedCollections: snippet => {
      const orderedCollections = [];

      const primaryCollections = snippet.collections.primary;
      const allSecondaryCollections = snippet.collections.secondary;
      const mainSecondaryCollection = allSecondaryCollections.length
        ? allSecondaryCollections.find(collection =>
            collection.matchesTag(snippet.primaryTag)
          )
        : undefined;
      const secondaryCollections = mainSecondaryCollection
        ? allSecondaryCollections.except(mainSecondaryCollection.id)
        : allSecondaryCollections;
      const otherCollections = snippet.collections.except(
        'snippets', // Exclude main listing from breadcrumbs
        ...primaryCollections.flatPluck('id'),
        ...allSecondaryCollections.flatPluck('id')
      );

      // We don't expect to have multiple primary collections
      if (primaryCollections.length)
        orderedCollections.push(primaryCollections.first);

      if (mainSecondaryCollection)
        orderedCollections.push(mainSecondaryCollection);

      if (secondaryCollections.length)
        orderedCollections.push(...secondaryCollections.toArray());

      if (otherCollections.length)
        orderedCollections.push(...otherCollections.toArray());

      return orderedCollections;
    },
    breadcrumbCollectionIds: snippet => {
      if (!snippet.hasCollection) return [];

      const ids = [];
      if (snippet.orderedCollections[0]) {
        // Has both primary and secondary
        if (snippet.orderedCollections[0].isPrimary)
          ids.push(snippet.orderedCollections[0].id);
        if (snippet.orderedCollections[1])
          ids.push(snippet.orderedCollections[1].id);
      } else {
        // Only has secondary, use one
        ids.push(snippet.orderedCollections[0].id);
      }
      return ids;
    },
    breadcrumbs: snippet => {
      const homeCrumb = {
        url: '/',
        name: 'Home',
      };

      const collectionCrumbs = snippet.collections
        .only(...snippet.breadcrumbCollectionIds)
        .flatMap(collection => ({
          url: collection.firstPageSlug,
          name: collection.miniName,
        }));

      const snippetCrumb = {
        url: snippet.slug,
        name: snippet.shortTitle,
      };

      return [homeCrumb, ...collectionCrumbs, snippetCrumb].filter(Boolean);
    },
    hasCollection: snippet => Boolean(snippet.collections.length),
    recommendedCollection: snippet =>
      snippet.collections.except(...snippet.breadcrumbCollectionIds).ranked
        .first,
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
    'seoTitle',
    'primaryTag',
    'formattedPrimaryTag',
    'formattedMiniPreviewTag',
    'formattedTags',
    'formattedPreviewTags',
    'slug',
    'fileSlug',
    'isScheduled',
    'isPublished',
    'isListed',
    'ranking',
    'dateFormatted',
    'searchTokensArray',
    'searchTokens',
    'orderedCollections',
    'breadcrumbCollectionIds',
    'hasCollection',
  ],
  scopes: {
    allByPopularity: {
      matcher: () => true,
      sorter: (a, b) => b.ranking - a.ranking,
    },
    allByNew: {
      matcher: () => true,
      sorter: (a, b) => b.dateModified - a.dateModified,
    },
    unlisted: snippet => !snippet.isListed,
    listed: snippet => snippet.isListed,
    listedByPopularity: {
      matcher: snippet => snippet.isListed,
      sorter: (a, b) => b.ranking - a.ranking,
    },
    listedByNew: {
      matcher: snippet => snippet.isListed,
      sorter: (a, b) => b.dateModified - a.dateModified,
    },
    scheduled: snippet => snippet.isScheduled,
    published: snippet => snippet.isPublished,
    publishedByPopularity: {
      matcher: snippet => snippet.isPublished,
      sorter: (a, b) => b.ranking - a.ranking,
    },
    publishedByNew: {
      matcher: snippet => snippet.isPublished,
      sorter: (a, b) => b.dateModified - a.dateModified,
    },
  },
};
