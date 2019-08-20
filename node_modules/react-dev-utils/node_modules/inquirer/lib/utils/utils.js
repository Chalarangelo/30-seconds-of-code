'use strict';
var _ = require('lodash');
var rx = require('rx-lite-aggregates');
var runAsync = require('run-async');

/**
 * Resolve a question property value if it is passed as a function.
 * This method will overwrite the property on the question object with the received value.
 * @param  {Object} question - Question object
 * @param  {String} prop     - Property to fetch name
 * @param  {Object} answers  - Answers object
 * @return {rx.Obsersable}   - Observable emitting once value is known
 */

exports.fetchAsyncQuestionProperty = function (question, prop, answers) {
  if (!_.isFunction(question[prop])) {
    return rx.Observable.return(question);
  }

  return rx.Observable.fromPromise(runAsync(question[prop])(answers)
    .then(function (value) {
      question[prop] = value;
      return question;
    })
  );
};
