/**
 * Base prompt implementation
 * Should be extended by prompt types.
 */

var _ = require('lodash');
var chalk = require('chalk');
var runAsync = require('run-async');
var Choices = require('../objects/choices');
var ScreenManager = require('../utils/screen-manager');

var Prompt = module.exports = function (question, rl, answers) {
  // Setup instance defaults property
  _.assign(this, {
    answers: answers,
    status: 'pending'
  });

  // Set defaults prompt options
  this.opt = _.defaults(_.clone(question), {
    validate: function () {
      return true;
    },
    filter: function (val) {
      return val;
    },
    when: function () {
      return true;
    },
    suffix: '',
    prefix: chalk.green('?')
  });

  // Check to make sure prompt requirements are there
  if (!this.opt.message) {
    this.throwParamError('message');
  }
  if (!this.opt.name) {
    this.throwParamError('name');
  }

  // Normalize choices
  if (Array.isArray(this.opt.choices)) {
    this.opt.choices = new Choices(this.opt.choices, answers);
  }

  this.rl = rl;
  this.screen = new ScreenManager(this.rl);
};

/**
 * Start the Inquiry session and manage output value filtering
 * @return {Promise}
 */

Prompt.prototype.run = function () {
  return new Promise(function (resolve) {
    this._run(function (value) {
      resolve(value);
    });
  }.bind(this));
};

// default noop (this one should be overwritten in prompts)
Prompt.prototype._run = function (cb) {
  cb();
};

/**
 * Throw an error telling a required parameter is missing
 * @param  {String} name Name of the missing param
 * @return {Throw Error}
 */

Prompt.prototype.throwParamError = function (name) {
  throw new Error('You must provide a `' + name + '` parameter');
};

/**
 * Called when the UI closes. Override to do any specific cleanup necessary
 */
Prompt.prototype.close = function () {
  this.screen.releaseCursor();
};

/**
 * Run the provided validation method each time a submit event occur.
 * @param  {Rx.Observable} submit - submit event flow
 * @return {Object}        Object containing two observables: `success` and `error`
 */
Prompt.prototype.handleSubmitEvents = function (submit) {
  var self = this;
  var validate = runAsync(this.opt.validate);
  var filter = runAsync(this.opt.filter);
  var validation = submit.flatMap(function (value) {
    return filter(value, self.answers).then(function (filteredValue) {
      return validate(filteredValue, self.answers).then(function (isValid) {
        return {isValid: isValid, value: filteredValue};
      }, function (err) {
        return {isValid: err};
      });
    }, function (err) {
      return {isValid: err};
    });
  }).share();

  var success = validation
    .filter(function (state) {
      return state.isValid === true;
    })
    .take(1);

  var error = validation
    .filter(function (state) {
      return state.isValid !== true;
    })
    .takeUntil(success);

  return {
    success: success,
    error: error
  };
};

/**
 * Generate the prompt question string
 * @return {String} prompt question string
 */

Prompt.prototype.getQuestion = function () {
  var message = this.opt.prefix + ' ' + chalk.bold(this.opt.message) + this.opt.suffix + chalk.reset(' ');

  // Append the default if available, and if question isn't answered
  if (this.opt.default != null && this.status !== 'answered') {
    message += chalk.dim('(' + this.opt.default + ') ');
  }

  return message;
};
