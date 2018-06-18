const findLastIndex = (arr, fn) =>
arr
.map((val, i) => [i, val])
.filter(([i, val]) => fn(val, i, arr))
.pop()[0];
module.exports = findLastIndex;