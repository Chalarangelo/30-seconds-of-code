import logger, {format} from './logOutput';
import prepareAssets from './prepareAssets';
import extractSnippets from './extractSnippets';
import updateContent from './updateContent';
import makeIcons from './makeIcons';
import makeLangBackgrounds from './makeLangBackgrounds';

const helpFlag = /^-{0,2}h(elp)?$/gi;
const actions = {
  'help': {
    description: 'display this text and exit',
    process: () => {},
    step: -1,
  },
  'assets': {
    description: 'preprocess assets from the provided config paths',
    process: prepareAssets,
    step: 1,
  },
  'extract': {
    description: 'extract snippets from the provided config paths',
    process: extractSnippets,
    step: 1,
  },
  'update': {
    description: 'fetch content sources from the respective repos',
    process: updateContent,
    step: 0,
  },
  'icons': {
    description: 'generate an icon font from the provided SVGs',
    process: makeIcons,
    step: 0,
  },
  'backgrounds': {
    description: 'generate SCSS styles from the provided icons',
    process: makeLangBackgrounds,
    step: 0,
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

  await Promise.all(
    Object.keys(actions)
      .filter(flagName => actions[flagName].step === 0)
      .map(flagName => {
        const flag = new RegExp(`^-{0,2}${flagName.slice(0, 1)}(${flagName.slice(1)})?$`, 'gi');
        if(config.args.some(arg => flag.test(arg))) return actions[flagName].process();
      })
  );
  logger.breakLine();

  await Promise.all(
    Object.keys(actions)
      .filter(flagName => actions[flagName].step === 1)
      .map(flagName => {
        const flag = new RegExp(`^-{0,2}${flagName.slice(0, 1)}(${flagName.slice(1)})?$`, 'gi');
        if(config.args.some(arg => flag.test(arg))) return actions[flagName].process();
      })
  );
  logger.breakLine();

  logger.log(`${format('coeus', 'bold')} is terminating...`, 'info');
};

export default coeus;
