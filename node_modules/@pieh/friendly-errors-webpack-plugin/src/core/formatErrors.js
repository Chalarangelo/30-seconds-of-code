'use strict';

/**
 * Applies formatters to all AnnotatedErrors.
 *
 * A formatter has the following signature: FormattedError => Array<String>.
 * It takes a formatted error produced by a transformer and returns a list
 * of log statements to print.
 *
 */
function formatErrors(errors, formatters, errorType) {
  const format = (formatter) => formatter(errors, errorType) || [];
  const flatten = (accum, curr) => accum.concat(curr);

  return formatters.map(format).reduce(flatten, [])
}

module.exports = formatErrors;
