const partialRight = (fn, ...partials) => (...args) => fn(...args, ...partials);

module.exports = partialRight;