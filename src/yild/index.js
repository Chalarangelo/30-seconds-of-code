
import logger, { format } from './logOutput';
import { actions, helpFlag } from './core';

/**
 * Performs the actions of the given step, using the provided config.
 * @param {object} actions - A set of actions that can be executed.
 * @param {object} config - A configuration object.
 */
const performStepActions = (actions, config) => stepNo =>
  Object.keys(actions)
    .filter(flagName => actions[flagName].step === stepNo)
    .map(flagName => {
      const matchingArg = config.args.find(arg => actions[flagName].matcher.test(arg));
      if(matchingArg) {
        const param = actions[flagName].param && matchingArg.indexOf('=') !== -1
          ? matchingArg.slice(matchingArg.indexOf('=') + 1)
          : false;
        return actions[flagName].process(param);
      }
    });

/**
 * Run preprocessing tasks based on the given configuration.
 * @param {object} config - A configuration object.
 */
const yild = async config => {
  global._yild_instance = {
    config,
    env: config.args.indexOf('DEVELOPMENT') !== -1
      ? 'DEVELOPMENT'
      : 'PRODUCTION',
  };

  logger.log(`${format('yild', 'bold')} is starting up...`, 'info');
  logger.logProcessInfo();
  logger.breakLine();

  if(config.args.some(arg => helpFlag.test(arg))) {
    logger.logOptionList(actions);
    return;
  }

  const performStep = performStepActions(actions, config);

  await Promise.all(performStep(0));
  logger.breakLine();

  await Promise.all(performStep(1));
  logger.breakLine();

  await Promise.all(performStep(2));
  logger.breakLine();

  logger.log(`${format('yild', 'bold')} is terminating...`, 'info');
};

export default yild;
