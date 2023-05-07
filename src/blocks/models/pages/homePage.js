import { Schemer } from 'blocks/utilities/schemer';
import settings from 'settings/global';
import presentationSettings from 'settings/presentation';

export const homePage = {
  name: 'HomePage',
  fields: [
    { name: 'slug', type: 'stringRequired' },
    { name: 'snippetCount', type: 'numberRequired' },
  ],
  properties: {
    params: () => undefined,
  },
  lazyProperties: {
    props:
      ({ serializers: { PreviewSerializer } }) =>
      page => {
        const context = {};

        context.featuredCollections = PreviewSerializer.serializeArray(
          page.collections.toArray(),
          { type: 'collection' }
        );
        context.featuredCollections.push({
          title: 'More collections',
          url: '/collections/p/1',
          selected: false,
        });

        context.featuredSnippets = PreviewSerializer.serializeArray(
          page.snippets.toArray(),
          { type: 'snippet' }
        );

        context.splashImage = presentationSettings.homePageSplashImage;
        context.snippetListUrl = '/list/p/1';
        context.pageDescription = `Browse ${page.snippetCount} short code snippets for all your development needs on ${settings.websiteName}.`;
        context.structuredData = Schemer.generateHomeData();

        return context;
      },
  },
};
