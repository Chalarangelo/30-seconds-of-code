'use strict';

const extractError = require('./extractWebpackError');

/**
 * Applies all transformers to all errors and returns "annotated"
 * errors.
 *
 * Each transformer should have the following signature WebpackError => AnnotatedError
 *
 * A WebpackError has the following fields:
 * - message
 * - file
 * - origin
 * - name
 * - severity
 * - webpackError (original error)
 *
 * An AnnotatedError should be an extension (Object.assign) of the WebpackError
 * and add whatever information is convenient for formatting.
 * In particular, they should have a 'priority' field.
 *
 * The plugin will only display errors having maximum priority at the same time.
 *
 * If they don't have a 'type' field, the will be handled by the default formatter.
 */
function processErrors (errors, transformers) {
  const transform = (error, transformer) => transformer(error);
  const applyTransformations = (error) => transformers.reduce(transform, error);

  return errors.map(extractError).map(applyTransformations);
}

module.exports = processErrors;
