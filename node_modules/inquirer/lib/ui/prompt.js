'use strict';
var _ = require('lodash');
var { defer, empty, from, of } = require('rxjs');
var { concatMap, filter, publish, reduce } = require('rxjs/operators');
var runAsync = require('run-async');
var utils = require('../utils/utils');
var Base = require('./baseUI');

/**
 * Base interface class other can inherits from
 */

class PromptUI extends Base {
  constructor(prompts, opt) {
    super(opt);
    this.prompts = prompts;
  }

  run(questions) {
    // Keep global reference to the answers
    this.answers = {};

    // Make sure questions is an array.
    if (_.isPlainObject(questions)) {
      questions = [questions];
    }

    // Create an observable, unless we received one as parameter.
    // Note: As this is a public interface, we cannot do an instanceof check as we won't
    // be using the exact same object in memory.
    var obs = _.isArray(questions) ? from(questions) : questions;

    this.process = obs.pipe(
      concatMap(this.processQuestion.bind(this)),
      publish() // Creates a hot Observable. It prevents duplicating prompts.
    );

    this.process.connect();

    return this.process
      .pipe(
        reduce((answers, answer) => {
          _.set(this.answers, answer.name, answer.answer);
          return this.answers;
        }, {})
      )
      .toPromise(Promise)
      .then(this.onCompletion.bind(this));
  }

  /**
   * Once all prompt are over
   */

  onCompletion() {
    this.close();

    return this.answers;
  }

  processQuestion(question) {
    question = _.clone(question);
    return defer(() => {
      var obs = of(question);

      return obs.pipe(
        concatMap(this.setDefaultType.bind(this)),
        concatMap(this.filterIfRunnable.bind(this)),
        concatMap(() =>
          utils.fetchAsyncQuestionProperty(question, 'message', this.answers)
        ),
        concatMap(() =>
          utils.fetchAsyncQuestionProperty(question, 'default', this.answers)
        ),
        concatMap(() =>
          utils.fetchAsyncQuestionProperty(question, 'choices', this.answers)
        ),
        concatMap(this.fetchAnswer.bind(this))
      );
    });
  }

  fetchAnswer(question) {
    var Prompt = this.prompts[question.type];
    this.activePrompt = new Prompt(question, this.rl, this.answers);
    return defer(() =>
      from(
        this.activePrompt.run().then(answer => ({ name: question.name, answer: answer }))
      )
    );
  }

  setDefaultType(question) {
    // Default type to input
    if (!this.prompts[question.type]) {
      question.type = 'input';
    }

    return defer(() => of(question));
  }

  filterIfRunnable(question) {
    if (question.when === false) {
      return empty();
    }

    if (!_.isFunction(question.when)) {
      return of(question);
    }

    var answers = this.answers;
    return defer(() =>
      from(
        runAsync(question.when)(answers).then(shouldRun => {
          if (shouldRun) {
            return question;
          }
        })
      ).pipe(filter(val => val != null))
    );
  }
}

module.exports = PromptUI;
