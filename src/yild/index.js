
import logger, {format} from './logOutput';
import actions, { helpFlag } from './actions';

const yild = async config => {
  global._yild_instance = {
    config,
  };

  logger.log(`${format('yild', 'bold')} is starting up...`, 'info');
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

  logger.log(`${format('yild', 'bold')} is terminating...`, 'info');
};

export default yild;
