import logger, {format} from './logOutput';
import prepareAssets from './prepareAssets';

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
};

const coeus = async config => {
  global._coeus_instance = {
    config,
  };

  logger.log(`${format('coeus', 'bold')} is starting up...`, 'info');
  logger.logProcessInfo();

  if(config.args.some(arg => helpFlag.test(arg))) {
    logger.logOptionList(actions);
    return;
  }

  await Object.keys(actions).forEach((flagName => {
    const flag = new RegExp(`^-{0,2}${flagName.slice(0, 1)}(${flagName.slice(1)})?$`, 'gi');
    if(config.args.some(arg => flag.test(arg)))
      actions[flagName].process();
  }));
};

export default coeus;
