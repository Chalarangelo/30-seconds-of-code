module.exports = flatten = (arr, depth = 1) =>
depth != 1
? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
: arr.reduce((a, v) => a.concat(v), []);