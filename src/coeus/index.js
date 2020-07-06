import logger, {format} from './logOutput';
import prepareAssets from './prepareAssets';
import extractSnippets from './extractSnippets';
import updateContent from './updateContent';
import makeIcons from './makeIcons';
import makeLangBackgrounds from './makeLangBackgrounds';
import prepareEnv from './prepareEnv';
import prepareCacheKey from './prepareCacheKey';

const helpFlag = /^-{0,2}h(elp)?$/gi;
const actions = {
  'help': {
    description: 'display this text and exit',
    process: () => {},
    step: -1,
    matcher: helpFlag,
  },
  'assets': {
    description: 'preprocess assets from the provided config paths',
    process: prepareAssets,
    step: 1,
    matcher: /^-{0,2}a(ssets)?$/gi,
  },
  'extract': {
    description: 'extract snippets from the provided config paths',
    process: extractSnippets,
    step: 1,
    matcher: /^-{0,2}e(xtract)?$/gi,
  },
  'update': {
    description: 'fetch content sources from the respective repos',
    process: updateContent,
    step: 0,
    matcher: /^-{0,2}u(pdate)?$/gi,
  },
  'icons': {
    description: 'generate an icon font from the provided SVGs',
    process: makeIcons,
    step: 0,
    matcher: /^-{0,2}i(cons)?$/gi,
  },
  'backgrounds': {
    description: 'generate SCSS styles from the provided icons',
    process: makeLangBackgrounds,
    step: 0,
    matcher: /^-{0,2}b(ackgrounds)?$/gi,
  },
  'environment': {
    description: `generate environment configuration file\n${format('ENV', 'green', 'bold')} can be one of: (DEVELOPMENT, PRODUCTION)`,
    process: prepareEnv,
    step: 0,
    matcher: /^-(n)|(-environment)=.*$/gi,
    key: { short: 'n', long: 'environment' },
    param: 'ENV',
  },
  'cache': {
    description: `generate cache key file`,
    process: prepareCacheKey,
    step: 0,
    matcher: /^-{0,2}c(ache)?$/gi,
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
        const matchingArg = config.args.find(arg => actions[flagName].matcher.test(arg));
        if(matchingArg) {
          const param = actions[flagName].param && matchingArg.indexOf('=') !== -1
            ? matchingArg.slice(matchingArg.indexOf('=') + 1)
            : false;
          return actions[flagName].process(param);
        }
      })
  );
  logger.breakLine();

  await Promise.all(
    Object.keys(actions)
      .filter(flagName => actions[flagName].step === 1)
      .map(flagName => {
        const matchingArg = config.args.find(arg => actions[flagName].matcher.test(arg));
        if(matchingArg) {
          const param = actions[flagName].param && matchingArg.indexOf('=') !== -1
            ? matchingArg.slice(matchingArg.indexOf('=') + 1)
            : false;
          return actions[flagName].process(param);
        }
      })
  );
  logger.breakLine();

  logger.log(`${format('coeus', 'bold')} is terminating...`, 'info');
};

export default coeus;
