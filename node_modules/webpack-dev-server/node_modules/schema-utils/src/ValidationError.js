/* eslint-disable
  strict,
  no-param-reassign
*/

'use strict';

class ValidationError extends Error {
  constructor(errors, name) {
    super();

    this.name = 'ValidationError';

    this.message = `${name || ''} Invalid Options\n\n`;

    this.errors = errors.map((err) => {
      err.dataPath = err.dataPath.replace(/\//g, '.');

      return err;
    });

    this.errors.forEach((err) => {
      this.message += `options${err.dataPath} ${err.message}\n`;
    });

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidationError;
