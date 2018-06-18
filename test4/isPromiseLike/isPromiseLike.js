const isPromiseLike = obj =>
obj !== null &&
(typeof obj === 'object' || typeof obj === 'function') &&
typeof obj.then === 'function';
module.exports = isPromiseLike;