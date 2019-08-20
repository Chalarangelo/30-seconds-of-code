'use strict';

const pRetry = require('p-retry');
const portfinder = require('portfinder');
const defaultPort = require('./defaultPort');
const defaultTo = require('./defaultTo');
const tryParseInt = require('./tryParseInt');

function runPortFinder() {
  return new Promise((resolve, reject) => {
    portfinder.basePort = defaultPort;
    portfinder.getPort((error, port) => {
      if (error) {
        return reject(error);
      }

      return resolve(port);
    });
  });
}

function findPort(port) {
  if (port) {
    return Promise.resolve(port);
  }

  // Try to find unused port and listen on it for 3 times,
  // if port is not specified in options.
  // Because NaN == null is false, defaultTo fails if parseInt returns NaN
  // so the tryParseInt function is introduced to handle NaN
  const defaultPortRetry = defaultTo(
    tryParseInt(process.env.DEFAULT_PORT_RETRY),
    3
  );

  return pRetry(runPortFinder, { retries: defaultPortRetry });
}

module.exports = findPort;
