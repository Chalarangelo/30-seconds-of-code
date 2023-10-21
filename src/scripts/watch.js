import { Application } from '#blocks/application';

export const watch = async () => {
  Application.Logger.log('Watch process is starting up...\n');
  Application.Logger.logProcessInfo();

  await Application.extractAndInitialize();

  await Application.watch();
};

watch();
