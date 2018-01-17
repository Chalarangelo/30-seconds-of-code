const negate = func => (...args) => !func(...args);
 module.exports = negate