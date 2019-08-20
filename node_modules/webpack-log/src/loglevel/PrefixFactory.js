'use strict';

/* eslint-disable
  no-param-reassign,
  space-before-function-paren
*/
const MethodFactory = require('./MethodFactory');

const defaults = {
  name (options) {
    return options.logger.name;
  },
  time () {
    return new Date().toTimeString().split(' ')[0];
  },
  level (options) {
    return `[${options.level}]`;
  },
  template: '{{time}} {{level}} '
};

class PrefixFactory extends MethodFactory {
  constructor(logger, options) {
    super(logger);

    this.options = Object.assign({}, defaults, options);
  }

  interpolate(level) {
    return this.options.template.replace(/{{([^{}]*)}}/g, (stache, prop) => {
      const fn = this.options[prop];

      if (fn) {
        return fn({ level, logger: this.logger });
      }

      return stache;
    });
  }

  make(method) {
    const og = super.make(method);

    return (...args) => {
      const [first] = args;

      const output = this.interpolate(method);

      if (typeof first === 'string') {
        args[0] = output + first;
      } else {
        args.unshift(output);
      }

      og(...args);
    };
  }
}

module.exports = PrefixFactory;
