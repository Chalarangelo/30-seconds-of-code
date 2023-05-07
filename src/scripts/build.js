import { Application } from 'blocks/application';

export const build = async () => {
  Application.Logger.log('Build process is starting up...\n');
  Application.Logger.logProcessInfo();

  await Application.extractAndInitialize();

  await Promise.all([
    Application.AssetWriter.write(),
    Application.SearchIndexWriter.write(),
    Application.PageWriter.write(),
    // TODO: Replace with Astro plugin
    Application.SitemapWriter.write(),
    Application.FeedWriter.write(),
  ]);
};

build();
