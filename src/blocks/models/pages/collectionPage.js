import { Schemer } from 'blocks/utilities/schemer';
import pathSettings from 'settings/paths';

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
      const baseUrl = collection.slug;
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
