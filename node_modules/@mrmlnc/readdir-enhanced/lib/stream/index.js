'use strict';

module.exports = readdirStream;

const DirectoryReader = require('../directory-reader');

let streamFacade = {
  fs: require('fs'),
  forEach: require('../async/for-each'),
  async: true
};

/**
 * Returns the {@link stream.Readable} of an asynchronous {@link DirectoryReader}.
 *
 * @param {string} dir
 * @param {object} [options]
 * @param {object} internalOptions
 */
function readdirStream (dir, options, internalOptions) {
  internalOptions.facade = streamFacade;

  let reader = new DirectoryReader(dir, options, internalOptions);
  return reader.stream;
}
