import { Schemer } from 'blocks/utilities/schemer';
import pathSettings from 'settings/paths';

export const collectionPage = {
  name: 'CollectionPage',
  fields: [
    { name: 'slug', type: 'stringRequired' },
    { name: 'pageNumber', type: 'numberRequired' },
  ],
  properties: {
    params: page => {
      const [lang, ...listing] = page.slug.slice(1).split('/');
      return { lang, listing };
    },
  },
  lazyProperties: {
    props:
      ({ serializers: { PreviewSerializer } }) =>
      page => {
        const collection = page.collection;
        const context = {};

        // TODO: These can have simpler names, update Astro, too
        context.slug = page.slug;
        context.listingName = collection.name;
        context.listingDescription = collection.description;
        context.listingCover = `/${pathSettings.staticAssetPath}/splash/${collection.splash}`;
        context.listingSublinks = collection.sublinks;
        context.pageDescription = collection.seoDescription;

        const pageNumber = page.pageNumber;
        const totalPages = collection.pageCount;
        const baseUrl = collection.slug;
        let buttons =
          totalPages === 2
            ? [1, 2]
            : [
                1,
                Math.min(Math.max(pageNumber, 2), totalPages - 1),
                totalPages,
              ];
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

        context.snippetList = PreviewSerializer.serializeArray(
          page.snippets.toArray(),
          { type: 'snippet' }
        );

        context.structuredData = Schemer.generateListingData({
          title: page.name,
          slug: page.slug,
          items: context.snippetList,
        });

        return context;
      },
  },
};
