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
  },
  lazyProperties: {
    props:
      ({ serializers: { PreviewSerializer } }) =>
      page => {
        const context = {};
        // TODO: These can have simpler names, update Astro, too
        context.slug = page.slug;
        context.listingName = page.name;
        context.listingDescription = page.description;
        context.listingCover = `/${pathSettings.staticAssetPath}/splash/${page.splash}`;
        context.pageDescription = page.shortDescription;

        const pageNumber = page.pageNumber;
        const totalPages = page.pageCount;
        const baseUrl = page.baseSlug;
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
          page.collections.toArray(),
          { type: 'collection' }
        );

        context.structuredData = Schemer.generateListingData({
          title: page.name,
          slug: page.slug,
          items: context.snippetList,
        });

        return context;
      },
  },
  cacheProperties: ['baseSlug'],
};
