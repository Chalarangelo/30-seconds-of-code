const flatten = (arr, depth = 1) =>
arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
module.exports = flatten;