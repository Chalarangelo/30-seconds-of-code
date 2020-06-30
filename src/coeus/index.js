import logger, {format} from './logOutput';
import prepareAssets from './prepareAssets';
import extractSnippets from './extractSnippets';

const helpFlag = /^-{0,2}h(elp)?$/gi;
const actions = {
  'help': {
    description: 'display this text and exit',
    process: () => {},
  },
  'assets': {
    description: 'preprocess assets from the provided config paths',
    process: prepareAssets,
  },
  'extract': {
    description: 'extract snippets from the provided config paths',
    process: extractSnippets,
  },
};

const coeus = async config => {
  global._coeus_instance = {
    config,
  };

  logger.log(`${format('coeus', 'bold')} is starting up...`, 'info');
  logger.logProcessInfo();
  logger.breakLine();

  if(config.args.some(arg => helpFlag.test(arg))) {
    logger.logOptionList(actions);
    return;
  }

  await Promise.all(Object.keys(actions).map(flagName => {
    const flag = new RegExp(`^-{0,2}${flagName.slice(0, 1)}(${flagName.slice(1)})?$`, 'gi');
    if(config.args.some(arg => flag.test(arg)))
      actions[flagName].process();
  }));
};

export default coeus;
