import logger, { format } from './logger';

const bindLogger = name => logger.bindProcessLogger(name);

export {
  logger,
  format,
  bindLogger
};
