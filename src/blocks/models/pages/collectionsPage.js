import { Schemer } from '#blocks/utilities/schemer';
import pathSettings from '#settings/paths';

export const collectionsPage = {
  name: 'CollectionsPage',
  fields: {
    slug: 'string',
    name: 'string',
    description: 'string',
    shortDescription: 'string',
    splash: 'string',
    pageNumber: 'number',
    pageCount: 'number',
  },
  properties: {
    params: page => {
      const [lang, ...listing] = page.slug.slice(1).split('/');
      return { lang, listing };
    },
    baseSlug: {
      body: page => page.slug.replace(/\/p\/\d+$/, ''),
      cache: true,
    },
    props: page => {
      const context = {};

      context.slug = page.slug;
      context.pageDescription = page.shortDescription;

      context.collection = {
        name: page.name,
        description: page.description,
        cover: `/${pathSettings.staticAssetPath}/splash/${page.splash}`,
        sublinks: [],
      };

      const pageNumber = page.pageNumber;
      const totalPages = page.pageCount;
      context.pagination =
        totalPages > 1
          ? {
              pageNumber,
              totalPages,
              baseUrl: page.baseSlug,
              hasPrevious: pageNumber > 1,
              hasNext: pageNumber < totalPages,
              totalItems: page.collections.length,
              itemType: 'collections',
            }
          : null;

      context.collectionItems = page.collections.map(
        collection => collection.preview,
        { flat: true }
      );

      context.structuredData = Schemer.generateListingData({
        title: page.name,
        slug: page.slug,
        items: context.collectionItems,
      });

      return context;
    },
  },
};
