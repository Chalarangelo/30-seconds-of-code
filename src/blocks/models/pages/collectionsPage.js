import { Schemer } from 'blocks/utilities/schemer';
import pathSettings from 'settings/paths';

export const collectionPage = {
  name: 'CollectionsPage',
  fields: [
    { name: 'slug', type: 'stringRequired' },
    { name: 'name', type: 'stringRequired' },
    { name: 'description', type: 'stringRequired' },
    { name: 'shortDescription', type: 'stringRequired' },
    { name: 'splash', type: 'stringRequired' },
    { name: 'pageNumber', type: 'numberRequired' },
    { name: 'pageCount', type: 'numberRequired' },
  ],
  properties: {
    params: page => {
      const [lang, ...listing] = page.slug.slice(1).split('/');
      return { lang, listing };
    },
    baseSlug: page => page.slug.replace(/\/p\/\d+$/, ''),
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
      const baseUrl = page.baseSlug;
      let buttons =
        totalPages === 2
          ? [1, 2]
          : [1, Math.min(Math.max(pageNumber, 2), totalPages - 1), totalPages];
      context.paginator =
        totalPages > 1
          ? {
              previous:
                pageNumber > 1
                  ? {
                      url: `${baseUrl}/p/${pageNumber - 1}`,
                      label: 'Previous',
                    }
                  : null,
              pages: buttons.map(buttonNumber => ({
                label: buttonNumber,
                url: `${baseUrl}/p/${buttonNumber}`,
                current: buttonNumber === pageNumber,
              })),
              next:
                pageNumber < totalPages
                  ? {
                      url: `${baseUrl}/p/${pageNumber + 1}`,
                      label: 'Next',
                    }
                  : null,
            }
          : null;

      context.collectionItems = page.collections.flatMap(
        collection => collection.preview
      );

      context.structuredData = Schemer.generateListingData({
        title: page.name,
        slug: page.slug,
        items: context.collectionItems,
      });

      return context;
    },
  },
  cacheProperties: ['baseSlug'],
};
