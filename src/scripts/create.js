import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { Content } from 'blocks/utilities/content';

export const build = async () => {
  Logger.log('Creation process is starting up...', 'info');
  Logger.breakLine();

  if (process.argv.length < 4) {
    Logger.log(
      'Not enough arguments, 2 expected (submodule name and snippet name). Terminating...',
      'error'
    );
    return;
  }

  await Env.init('DEVELOPMENT');
  Content.createSnippet(process.argv[2], process.argv[3]);
};

build();
