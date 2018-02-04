const nthArg = n => (...args) => args.slice(n)[0];
module.exports = nthArg;