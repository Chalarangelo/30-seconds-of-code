import { Logger } from 'blocks/utilities/logger';
import { Content } from 'blocks/utilities/content';

export const build = async () => {
  Logger.log('Creation process is starting up...\n');

  if (process.argv.length < 4) {
    Logger.log(
      'Not enough arguments, 3 expected (directory name, snippet type and snippet name). Terminating...',
      'error'
    );
    return;
  }

  Content.createSnippet(process.argv[2], process.argv[3], process.argv[4]);
};

build();
