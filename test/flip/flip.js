const flip = fn => (first, ...rest) => fn(...rest, first);
 module.exports = flip