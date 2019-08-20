'use strict';

/* eslint-disable
  no-undefined
*/

function normalizeOptions(compiler, options) {
  // Setup default value
  options.contentBase =
    options.contentBase !== undefined ? options.contentBase : process.cwd();

  // normalize transportMode option
  if (options.transportMode === undefined) {
    options.transportMode = {
      server: 'sockjs',
      client: 'sockjs',
    };
  } else {
    switch (typeof options.transportMode) {
      case 'string':
        options.transportMode = {
          server: options.transportMode,
          client: options.transportMode,
        };
        break;
      // if not a string, it is an object
      default:
        options.transportMode.server = options.transportMode.server || 'sockjs';
        options.transportMode.client = options.transportMode.client || 'sockjs';
    }
  }

  if (!options.watchOptions) {
    options.watchOptions = {};
  }
}

module.exports = normalizeOptions;
