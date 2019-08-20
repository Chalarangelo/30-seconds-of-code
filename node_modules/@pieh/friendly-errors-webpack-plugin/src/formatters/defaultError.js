'use strict';

const concat = require('../utils').concat;
const formatTitle = require('../utils/colors').formatTitle;

function displayError(severity, error) {
  const baseError = formatTitle(severity, severity);

  return concat(
    `${baseError} ${removeLoaders(error.file)}`,
    '',
    error.message,
    (error.origin ? error.origin : undefined),
    '',
    error.infos
  );
}

function removeLoaders(file) {
  if (!file) {
    return "";
  }
  const split = file.split('!');
  const filePath = split[split.length - 1];
  return `in ${filePath}`;
}

function isDefaultError(error) {
  return !error.type;
}

/**
 * Format errors without a type
 */
function format(errors, type) {
  return errors
    .filter(isDefaultError)
    .reduce((accum, error) => (
      accum.concat(displayError(type, error))
    ), []);
}

module.exports = format;
