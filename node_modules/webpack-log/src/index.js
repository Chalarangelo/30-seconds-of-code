'use strict';

/* global window: true */
/* eslint-disable
  no-shadow,
  no-param-reassign,
  space-before-function-paren
*/
const uuid = require('uuid/v4');
const colors = require('ansi-colors');
const loglevel = require('./loglevel');

const symbols = {
  trace: colors.grey('₸'),
  debug: colors.cyan('➤'),
  info: colors.blue(colors.symbols.info),
  warn: colors.yellow(colors.symbols.warning),
  error: colors.red(colors.symbols.cross)
};

const defaults = {
  name: '<unknown>',
  level: 'info',
  unique: true
};

const prefix = {
  level (options) {
    return symbols[options.level];
  },
  template: `{{level}} ${colors.gray('｢{{name}}｣')}: `
};

function log (options) {
  const opts = Object.assign({}, defaults, options);
  const { id } = options;

  opts.prefix = Object.assign({}, prefix, options.prefix);
  delete opts.id;

  Object.defineProperty(opts, 'id', {
    get() {
      if (!id) {
        return this.name + (opts.unique ? `-${uuid()}` : '');
      }

      return id;
    }
  });

  if (opts.timestamp) {
    opts.prefix.template = `[{{time}}] ${opts.prefix.template}`;
  }

  const log = loglevel.getLogger(opts);

  if (!Object.prototype.hasOwnProperty.call(log, 'id')) {
    Object.defineProperty(log, 'id', {
      get() {
        return opts.id;
      }
    });
  }

  return log;
}

module.exports = log;
// NOTE: this is exported so that consumers of webpack-log can use the same
// version of ansi-colors to decorate log messages without incurring additional
// dependency overhead
module.exports.colors = colors;
// NOTE: This is an undocumented function solely for the purpose of tests.
// Do not use this method in production code. Using in production code
// may result in strange behavior.
module.exports.delLogger = function delLogger(name) {
  delete loglevel.loggers[name];
};

module.exports.factories = loglevel.factories;
