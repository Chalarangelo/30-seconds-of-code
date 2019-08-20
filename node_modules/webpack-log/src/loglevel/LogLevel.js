'use strict';

/* global window: true */
/* eslint-disable
  multiline-ternary,
  no-param-reassign
*/
const PrefixFactory = require('./PrefixFactory');
const MethodFactory = require('./MethodFactory');

const defaults = {
  name: +new Date(),
  level: 'warn',
  prefix: null,
  factory: null
};

class LogLevel {
  constructor(options) {
    // implement for some _very_ loose type checking. avoids getting into a
    // circular require between MethodFactory and LogLevel
    this.type = 'LogLevel';
    this.options = Object.assign({}, defaults, options);
    this.methodFactory = options.factory;

    if (!this.methodFactory) {
      const factory = options.prefix
        ? new PrefixFactory(this, options.prefix)
        : new MethodFactory(this);

      this.methodFactory = factory;
    }

    if (!this.methodFactory.logger) {
      this.methodFactory.logger = this;
    }

    this.name = options.name || '<unknown>';
    // this.level is a setter, do this after setting up the factory
    this.level = this.options.level;
  }

  get factory() {
    return this.methodFactory;
  }

  set factory(factory) {
    factory.logger = this;

    this.methodFactory = factory;
    this.methodFactory.replaceMethods(this.level);
  }

  enable() {
    this.level = this.levels.TRACE;
  }

  disable() {
    this.level = this.levels.SILENT;
  }

  get level() {
    return this.currentLevel;
  }

  set level(logLevel) {
    const level = this.methodFactory.distillLevel(logLevel);

    if (level == null) {
      throw new Error(
        `loglevel: setLevel() called with invalid level: ${logLevel}`
      );
    }

    this.currentLevel = level;
    this.methodFactory.replaceMethods(level);

    if (typeof console === 'undefined' && level < this.levels.SILENT) {
      // eslint-disable-next-line no-console
      console.warn(
        'loglevel: console is undefined. The log will produce no output'
      );
    }
  }

  get levels() { // eslint-disable-line class-methods-use-this
    return this.methodFactory.levels;
  }
}

module.exports = LogLevel;
