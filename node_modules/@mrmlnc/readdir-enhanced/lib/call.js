'use strict';

let call = module.exports = {
  safe: safeCall,
  once: callOnce,
};

/**
 * Calls a function with the given arguments, and ensures that the error-first callback is _always_
 * invoked exactly once, even if the function throws an error.
 *
 * @param {function} fn - The function to invoke
 * @param {...*} args - The arguments to pass to the function. The final argument must be a callback function.
 */
function safeCall (fn, args) {
  // Get the function arguments as an array
  args = Array.prototype.slice.call(arguments, 1);

  // Replace the callback function with a wrapper that ensures it will only be called once
  let callback = call.once(args.pop());
  args.push(callback);

  try {
    fn.apply(null, args);
  }
  catch (err) {
    callback(err);
  }
}

/**
 * Returns a wrapper function that ensures the given callback function is only called once.
 * Subsequent calls are ignored, unless the first argument is an Error, in which case the
 * error is thrown.
 *
 * @param {function} fn - The function that should only be called once
 * @returns {function}
 */
function callOnce (fn) {
  let fulfilled = false;

  return function onceWrapper (err) {
    if (!fulfilled) {
      fulfilled = true;
      return fn.apply(this, arguments);
    }
    else if (err) {
      // The callback has already been called, but now an error has occurred
      // (most likely inside the callback function). So re-throw the error,
      // so it gets handled further up the call stack
      throw err;
    }
  };
}
