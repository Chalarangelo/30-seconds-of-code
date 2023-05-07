import { Schemer } from 'blocks/utilities/schemer';

export const snippetPage = {
  name: 'SnippetPage',
  fields: [{ name: 'slug', type: 'stringRequired' }],
  properties: {
    params: page => {
      const segments = page.slug.slice(1).split('/');
      return {
        lang: segments[0],
        snippet: segments.slice(-1)[0],
      };
    },
  },
  lazyProperties: {
    props:
      ({ serializers: { SnippetContextSerializer, PreviewSerializer } }) =>
      page => {
        const snippet = page.snippet;
        const context = {};

        context.breadcrumbs = snippet.breadcrumbs;
        context.pageDescription = snippet.seoDescription;
        context.snippet = SnippetContextSerializer.serialize(snippet);

        let recommendedItems = PreviewSerializer.serializeArray(
          snippet.recommendedSnippets.toArray(),
          { type: 'snippet' }
        );

        if (snippet.recommendedCollection) {
          recommendedItems.unshift(
            PreviewSerializer.serialize(snippet.recommendedCollection, {
              type: 'collection',
            })
          );
        }

        context.recommendations = recommendedItems;

        context.structuredData = Schemer.generateSnippetData({
          title: snippet.seoTitle,
          slug: snippet.slug,
          description: snippet.shortText,
          cover: context.snippet.cover,
          dateModified: snippet.dateModified,
          author: snippet.author,
        });

        return context;
      },
  },
  scopes: {
    published: page => page.snippet.isPublished,
  },
};
