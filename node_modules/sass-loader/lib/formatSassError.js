'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs');

// A typical sass error looks like this
// const SassError = {
//   message: "invalid property name",
//   column: 14,
//   line: 1,
//   file: "stdin",
//   status: 1
// };

/**
 * Enhances the sass error with additional information about what actually went wrong.
 *
 * @param {SassError} err
 * @param {string} resourcePath
 */
function formatSassError(err, resourcePath) {
  // Instruct webpack to hide the JS stack from the console
  // Usually you're only interested in the SASS stack in this case.
  // eslint-disable-next-line no-param-reassign
  err.hideStack = true;

  // The file property is missing in rare cases.
  // No improvement in the error is possible.
  if (!err.file) {
    return;
  }

  let msg = err.message;

  if (err.file === 'stdin') {
    // eslint-disable-next-line no-param-reassign
    err.file = resourcePath;
  }

  // node-sass returns UNIX-style paths
  // eslint-disable-next-line no-param-reassign
  err.file = path.normalize(err.file);

  // The 'Current dir' hint of node-sass does not help us, we're providing
  // additional information by reading the err.file property
  msg = msg.replace(/\s*Current dir:\s*/, '');

  // eslint-disable-next-line no-param-reassign
  err.message = `${getFileExcerptIfPossible(err) +
    msg.charAt(0).toUpperCase() +
    msg.slice(1) +
    os.EOL}      in ${err.file} (line ${err.line}, column ${err.column})`;
}

/**
 * Tries to get an excerpt of the file where the error happened.
 * Uses err.line and err.column.
 *
 * Returns an empty string if the excerpt could not be retrieved.
 *
 * @param {SassError} err
 * @returns {string}
 */
function getFileExcerptIfPossible(err) {
  try {
    const content = fs.readFileSync(err.file, 'utf8');

    return `${os.EOL +
      content.split(os.EOL)[err.line - 1] +
      os.EOL +
      new Array(err.column - 1).join(' ')}^${os.EOL}      `;
  } catch (ignoreErr) {
    // If anything goes wrong here, we don't want any errors to be reported to the user
    return '';
  }
}

module.exports = formatSassError;
