const converge = (converger, fns) => (...args) => converger(...fns.map(fn => fn.apply(null, args)));
module.exports = converge;