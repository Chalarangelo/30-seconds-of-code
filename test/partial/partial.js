const partial = (fn, ...partials) => (...args) => fn(...partials, ...args);
module.exports = partial