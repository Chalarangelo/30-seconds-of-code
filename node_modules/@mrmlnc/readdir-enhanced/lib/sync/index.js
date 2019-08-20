'use strict';

module.exports = readdirSync;

const DirectoryReader = require('../directory-reader');

let syncFacade = {
  fs: require('./fs'),
  forEach: require('./for-each'),
  sync: true
};

/**
 * Returns the buffered output from a synchronous {@link DirectoryReader}.
 *
 * @param {string} dir
 * @param {object} [options]
 * @param {object} internalOptions
 */
function readdirSync (dir, options, internalOptions) {
  internalOptions.facade = syncFacade;

  let reader = new DirectoryReader(dir, options, internalOptions);
  let stream = reader.stream;

  let results = [];
  let data = stream.read();
  while (data !== null) {
    results.push(data);
    data = stream.read();
  }

  return results;
}
