const flip = fn => (...args) => fn(args.pop(), ...args);
 module.exports = flip