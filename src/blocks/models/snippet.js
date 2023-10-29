import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from '#utils';
import { Ranker } from '#blocks/utilities/ranker';
import { Recommender } from '#blocks/utilities/recommender';
import { TagFormatter } from '#blocks/utilities/tagFormatter';
import tokenizeSnippet from '#utils/search';

export const snippet = {
  name: 'Snippet',
  fields: {
    fileName: 'string',
    title: 'string',
    tags: 'stringArray',
    shortTitle: 'string',
    dateModified: 'date',
    listed: 'boolean',
    type: 'string',
    shortText: 'string',
    fullText: 'string',
    descriptionHtml: 'string',
    fullDescriptionHtml: 'string',
    cover: 'string',
    seoDescription: 'string',
  },
  properties: {
    seoTitle: {
      body: snippet => {
        if (!snippet.language) return snippet.title;
        const titleLanguage =
          snippet.language.short === 'js' && snippet.primaryTag === 'node'
            ? snippet.formattedPrimaryTag
            : snippet.language.name;
        if (snippet.title.includes(titleLanguage)) return snippet.title;
        return `${titleLanguage} - ${snippet.title}`;
      },
      cache: true,
    },
    primaryTag: { body: snippet => snippet.tags[0], cache: true },
    formattedPrimaryTag: {
      body: snippet => TagFormatter.format(snippet.primaryTag),
      cache: true,
    },
    // Used for snippet previews in search autocomplete
    formattedMiniPreviewTag: {
      body: snippet => (snippet.language ? snippet.language.name : 'Article'),
      cache: true,
    },
    formattedTags: {
      body: snippet => {
        let tags = snippet.tags.map(TagFormatter.format);
        if (snippet.language) tags.unshift(snippet.language.name);
        return tags.join(', ');
      },
      cache: true,
    },
    formattedPreviewTags: {
      body: snippet =>
        snippet.language
          ? `${snippet.language.name}, ${snippet.formattedPrimaryTag}`
          : snippet.formattedPrimaryTag,
      cache: true,
    },
    formattedDescription: {
      body: snippet =>
        snippet.descriptionHtml
          .replace('<p>', '')
          .replace('</p>', '')
          .replace(/<a.*?>(.*?)<\/a>/g, '$1'),
      cache: true,
    },
    slug: { body: snippet => `/${snippet.id}`, cache: true },
    fileSlug: {
      body: snippet => convertToSeoSlug(snippet.fileName.slice(0, -3)),
      cache: true,
    },
    isScheduled: {
      body: snippet => snippet.dateModified > new Date(),
      cache: true,
      inverse: 'isPublished',
    },
    isListed: {
      body: snippet => snippet.listed && !snippet.isScheduled,
      cache: true,
    },
    ranking: {
      body: snippet => Ranker.rankIndexableContent(snippet.indexableContent),
      cache: true,
    },
    dateFormatted: {
      body: snippet =>
        snippet.dateModified.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      cache: true,
    },
    searchTokensArray: {
      body: snippet => {
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
          tokenizableElements.push(
            snippet.language.short.toLowerCase(),
            snippet.language.long.toLowerCase()
          );

        return uniqueElements(tokenizableElements);
      },
      cache: true,
    },
    searchTokens: {
      body: snippet => snippet.searchTokensArray.join(' '),
      cache: true,
    },
    orderedCollections: {
      body: snippet => {
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
          ...primaryCollections.pluck('id'),
          ...allSecondaryCollections.pluck('id')
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
      cache: true,
    },
    breadcrumbCollectionIds: {
      body: snippet => {
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
      cache: true,
    },
    breadcrumbs: snippet => {
      const homeCrumb = {
        url: '/',
        name: 'Home',
      };

      const collectionCrumbs = snippet.collections
        .only(...snippet.breadcrumbCollectionIds)
        .map(
          collection => ({
            url: collection.firstPageSlug,
            name: collection.miniName,
          }),
          { flat: true }
        );

      const snippetCrumb = {
        url: snippet.slug,
        name: snippet.shortTitle,
      };

      return [homeCrumb, ...collectionCrumbs, snippetCrumb].filter(Boolean);
    },
    hasCollection: {
      body: snippet => Boolean(snippet.collections.length),
      cache: true,
    },
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
    recommendedSnippets: (snippet, { models: { Snippet } }) => {
      const recommendedSnippetIds = Recommender.recommendSnippets(
        snippet,
        Snippet.records
      );
      return Snippet.records.only(...recommendedSnippetIds);
    },
    preview: {
      body: (snippet, { serializers: { PreviewSerializer } }) =>
        PreviewSerializer.serialize(snippet, { type: 'snippet' }),
      cache: true,
    },
  },
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
