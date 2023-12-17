import { Schemer } from '#blocks/utilities/schemer';
import pathSettings from '#settings/paths';

export const collectionPage = {
  name: 'CollectionPage',
  fields: {
    slug: 'string',
    pageNumber: 'number',
  },
  properties: {
    params: page => {
      const [lang, ...listing] = page.slug.slice(1).split('/');
      return { lang, listing };
    },
    props: page => {
      const collection = page.collection;
      const context = {};

      context.slug = page.slug;
      context.pageDescription = collection.seoDescription;

      context.collection = {
        name: collection.name,
        description: collection.description,
        cover: `/${pathSettings.staticAssetPath}/splash/${collection.splash}`,
        sublinks: collection.sublinks,
      };

      const pageNumber = page.pageNumber;
      const totalPages = collection.pageCount;
      context.pagination =
        totalPages > 1
          ? {
              pageNumber,
              totalPages,
              baseUrl: collection.slug,
              hasPrevious: pageNumber > 1,
              hasNext: pageNumber < totalPages,
              totalItems: collection.listedSnippets.length,
              itemType: 'snippets',
            }
          : null;

      context.collectionItems = page.snippets.map(snippet => snippet.preview, {
        flat: true,
      });

      context.structuredData = Schemer.generateListingData({
        title: collection.name,
        slug: page.slug,
        items: context.collectionItems,
        pageNumber,
      });

      return context;
    },
  },
};
