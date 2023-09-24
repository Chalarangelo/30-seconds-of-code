import { Application } from 'blocks/application';

export const build = async () => {
  Application.Logger.log('Build process is starting up...\n');
  Application.Logger.logProcessInfo();

  await Application.extractAndInitialize();

  await Promise.all([
    Application.SearchIndexWriter.write(),
    Application.AssetWriter.write(),
    Application.PageWriter.write(),
  ]);
};

build();
