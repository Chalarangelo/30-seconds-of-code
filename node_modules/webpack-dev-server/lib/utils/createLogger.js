'use strict';

const log = require('webpack-log');

function createLogger(options = {}) {
  let level = options.logLevel || 'info';

  if (options.noInfo === true) {
    level = 'warn';
  }

  if (options.quiet === true) {
    level = 'silent';
  }

  return log({
    name: 'wds',
    level,
    timestamp: options.logTime,
  });
}

module.exports = createLogger;
