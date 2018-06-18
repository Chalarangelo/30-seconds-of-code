const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
module.exports = defer;