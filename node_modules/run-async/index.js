'use strict';

var isPromise = require('is-promise');

/**
 * Return a function that will run a function asynchronously or synchronously
 *
 * example:
 * runAsync(wrappedFunction, callback)(...args);
 *
 * @param   {Function} func  Function to run
 * @param   {Function} cb    Callback function passed the `func` returned value
 * @return  {Function(arguments)} Arguments to pass to `func`. This function will in turn
 *                                return a Promise (Node >= 0.12) or call the callbacks.
 */

var runAsync = module.exports = function (func, cb) {
  cb = cb || function () {};

  return function () {
    var async = false;
    var args = arguments;

    var promise = new Promise(function (resolve, reject) {
      var answer = func.apply({
        async: function () {
          async = true;
          return function (err, value) {
            if (err) {
              reject(err);
            } else {
              resolve(value);
            }
          };
        }
      }, Array.prototype.slice.call(args));

      if (!async) {
        if (isPromise(answer)) {
          answer.then(resolve, reject);
        } else {
          resolve(answer);
        }
      }
    });

    promise.then(cb.bind(null, null), cb);

    return promise;
  }
};

runAsync.cb = function (func, cb) {
  return runAsync(function () {
    var args = Array.prototype.slice.call(arguments);
    if (args.length === func.length - 1) {
      args.push(this.async());
    }
    return func.apply(this, args);
  }, cb);
};
