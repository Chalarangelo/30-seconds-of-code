/**
 * `editor` type prompt
 */

var util = require('util');
var chalk = require('chalk');
var ExternalEditor = require('external-editor');
var Base = require('./base');
var observe = require('../utils/events');
var rx = require('rx-lite-aggregates');

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

  this.editorResult = new rx.Subject();

  // Open Editor on "line" (Enter Key)
  var events = observe(this.rl);
  this.lineSubscription = events.line.forEach(this.startExternalEditor.bind(this));

  // Trigger Validation when editor closes
  var validation = this.handleSubmitEvents(this.editorResult);
  validation.success.forEach(this.onEnd.bind(this));
  validation.error.forEach(this.onError.bind(this));

  // Prevents default from being printed on screen (can look weird with multiple lines)
  this.currentText = this.opt.default;
  this.opt.default = null;

  // Init
  this.render();

  return this;
};

/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error) {
  var bottomContent = '';
  var message = this.getQuestion();

  if (this.status === 'answered') {
    message += chalk.dim('Received');
  } else {
    message += chalk.dim('Press <enter> to launch your preferred editor.');
  }

  if (error) {
    bottomContent = chalk.red('>> ') + error;
  }

  this.screen.render(message, bottomContent);
};

/**
 * Launch $EDITOR on user press enter
 */

Prompt.prototype.startExternalEditor = function () {
  // Pause Readline to prevent stdin and stdout from being modified while the editor is showing
  this.rl.pause();
  ExternalEditor.editAsync(this.currentText, this.endExternalEditor.bind(this));
};

Prompt.prototype.endExternalEditor = function (error, result) {
  this.rl.resume();
  if (error) {
    this.editorResult.onError(error);
  } else {
    this.editorResult.onNext(result);
  }
};

Prompt.prototype.onEnd = function (state) {
  this.editorResult.dispose();
  this.lineSubscription.dispose();
  this.answer = state.value;
  this.status = 'answered';
  // Re-render prompt
  this.render();
  this.screen.done();
  this.done(this.answer);
};

Prompt.prototype.onError = function (state) {
  this.render(state.isValid);
};
