/* eslint-disable
  strict
*/

'use strict';

class ValidationError extends Error {
  constructor(errors, name) {
    super();

    this.name = 'ValidationError';

    this.message = `${name || ''} Invalid Options\n\n`;

    errors.forEach((err) => {
      this.message += `options${err.dataPath} ${err.message}\n`;
    });

    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidationError;
