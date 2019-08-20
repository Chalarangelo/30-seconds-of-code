'use strict';

function isEslintError (e) {
  return e.originalStack
    .some(stackframe => stackframe.fileName && stackframe.fileName.indexOf('eslint-loader') > 0);
}

function transform(error) {
  if (isEslintError(error)) {
    return Object.assign({}, error, {
      name: 'Lint error',
      type: 'lint-error',
    });
  }

  return error;
}

module.exports = transform;
