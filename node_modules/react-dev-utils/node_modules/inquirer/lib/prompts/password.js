/**
 * `password` type prompt
 */

var util = require('util');
var chalk = require('chalk');
var Base = require('./base');
var observe = require('../utils/events');

function mask(input, maskChar) {
  input = String(input);
  maskChar = typeof maskChar === 'string' ? maskChar : '*';
  if (input.length === 0) {
    return '';
  }

  return new Array(input.length + 1).join(maskChar);
}

/**
 * Module exports
 */

module.exports = Prompt;

/**
 * Constructor
 */

function Prompt() {
  return Base.apply(this, arguments);
}
util.inherits(Prompt, Base);

/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function (cb) {
  this.done = cb;

  var events = observe(this.rl);

  // Once user confirm (enter key)
  var submit = events.line.map(this.filterInput.bind(this));

  var validation = this.handleSubmitEvents(submit);
  validation.success.forEach(this.onEnd.bind(this));
  validation.error.forEach(this.onError.bind(this));

  if (this.opt.mask) {
    events.keypress.takeUntil(validation.success).forEach(this.onKeypress.bind(this));
  }

  // Init
  this.render();

  return this;
};

/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error) {
  var message = this.getQuestion();
  var bottomContent = '';

  if (this.status === 'answered') {
    message += this.opt.mask ? chalk.cyan(mask(this.answer, this.opt.mask)) : chalk.italic.dim('[hidden]');
  } else if (this.opt.mask) {
    message += mask(this.rl.line || '', this.opt.mask);
  } else {
    message += chalk.italic.dim('[input is hidden] ');
  }

  if (error) {
    bottomContent = '\n' + chalk.red('>> ') + error;
  }

  this.screen.render(message, bottomContent);
};

/**
 * When user press `enter` key
 */

Prompt.prototype.filterInput = function (input) {
  if (!input) {
    return this.opt.default == null ? '' : this.opt.default;
  }
  return input;
};

Prompt.prototype.onEnd = function (state) {
  this.status = 'answered';
  this.answer = state.value;

  // Re-render prompt
  this.render();

  this.screen.done();
  this.done(state.value);
};

Prompt.prototype.onError = function (state) {
  this.render(state.isValid);
};

Prompt.prototype.onKeypress = function () {
  this.render();
};
