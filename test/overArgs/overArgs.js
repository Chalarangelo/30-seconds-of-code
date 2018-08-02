const overArgs = (fn, transforms) => (...args) => fn(...args.map((val, i) => transforms[i](val)));
module.exports = overArgs;
