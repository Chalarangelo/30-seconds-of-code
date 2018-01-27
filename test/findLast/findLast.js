const findLast = (arr, fn) => arr.filter(fn).slice(-1)[0];
module.exports = findLast