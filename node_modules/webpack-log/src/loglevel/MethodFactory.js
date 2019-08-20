'use strict';

/* eslint-disable
  arrow-parens,
  multiline-ternary,
  consistent-return,
  no-param-reassign,
  prefer-destructuring
*/
const noop = () => {};

const levels = Symbol('levels');
const instance = Symbol('instance');

class MethodFactory {
  constructor(logger) {
    this[levels] = {
      TRACE: 0,
      DEBUG: 1,
      INFO: 2,
      WARN: 3,
      ERROR: 4,
      SILENT: 5
    };

    this[instance] = logger;
  }

  set logger(logger) {
    this[instance] = logger;
  }

  get logger() {
    return this[instance];
  }

  get levels() {
    return this[levels];
  }

  get methods() {
    return Object.keys(this.levels)
      .map((key) => key.toLowerCase())
      .filter((key) => key !== 'silent');
  }

  distillLevel(level) {
    let result = level;

    if (
      typeof result === 'string' &&
      typeof this.levels[result.toUpperCase()] !== 'undefined'
    ) {
      result = this.levels[result.toUpperCase()];
    }

    if (this.levelValid(result)) {
      return result;
    }
  }

  levelValid(level) {
    if (
      typeof level === 'number' && level >= 0 &&
      level <= this.levels.SILENT
    ) {
      return true;
    }

    return false;
  }
  /**
   * Build the best logging method possible for this env
   * Wherever possible we want to bind, not wrap, to preserve stack traces.
   * Since we're targeting modern browsers, there's no need to wait for the
   * console to become available.
   */
  // eslint-disable-next-line class-methods-use-this
  make(method) {
    if (method === 'debug') {
      method = 'log';
    }

    /* eslint-disable no-console */
    if (typeof console[method] !== 'undefined') {
      return this.bindMethod(console, method);
    } else if (typeof console.log !== 'undefined') {
      return this.bindMethod(console, 'log');
    }

    /* eslint-enable no-console */
    return noop;
  }

  // eslint-disable-next-line class-methods-use-this
  bindMethod(obj, name) {
    const method = obj[name];

    if (typeof method.bind === 'function') {
      return method.bind(obj);
    }

    try {
      return Function.prototype.bind.call(method, obj);
    } catch (err) {
      // Missing bind shim or IE8 + Modernizr, fallback to wrapping
      return function result() {
        // eslint-disable-next-line prefer-rest-params
        return Function.prototype.apply.apply(method, [obj, arguments]);
      };
    }
  }

  replaceMethods(logLevel) {
    const level = this.distillLevel(logLevel);

    if (level == null) {
      throw new Error(
        `loglevel: replaceMethods() called with invalid level: ${logLevel}`
      );
    }

    if (!this.logger || this.logger.type !== 'LogLevel') {
      throw new TypeError(
        'loglevel: Logger is undefined or invalid. Please specify a valid Logger instance.'
      );
    }

    this.methods.forEach((method) => {
      this.logger[method] = (this.levels[method.toUpperCase()] < level)
        ? noop
        : this.make(method);
    });

    // Define log.log as an alias for log.debug
    this.logger.log = this.logger.debug;
  }
}

module.exports = MethodFactory;
