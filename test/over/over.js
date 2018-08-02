const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

module.exports = over;