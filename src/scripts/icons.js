import { Application } from 'blocks/application';

export const makeIcons = async () => {
  Application.Logger.log('Icon creation process is starting up...\n');
  Application.Logger.logProcessInfo();

  await Application.IconWriter.write();
};

makeIcons();
