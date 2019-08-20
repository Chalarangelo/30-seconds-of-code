'use strict';

const concat = require('../utils').concat;
const chalk = require('chalk');

const infos = [
  'You may use special comments to disable some warnings.',
  'Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.',
  'Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.'
];

function displayError(error) {
  return [error.message, '']
}

function format(errors, type) {
  const lintErrors = errors.filter(e => e.type === 'lint-error');
  if (lintErrors.length > 0) {
    const flatten = (accum, curr) => accum.concat(curr);
    return concat(
      lintErrors
        .map(error => displayError(error))
        .reduce(flatten, []),
      infos
    )
  }

  return [];
}

module.exports = format;
