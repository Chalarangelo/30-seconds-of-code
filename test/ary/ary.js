const ary = (fn, n) => (...args) => fn(...args.slice(0, n));
module.exports = ary;