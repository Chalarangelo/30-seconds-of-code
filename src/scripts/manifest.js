import { Application } from 'blocks/application';

export const makeManifest = async () => {
  Application.Logger.log('Manifest creation process is starting up...\n');
  Application.Logger.logProcessInfo();

  await Application.ManifestWriter.write();
};

makeManifest();
