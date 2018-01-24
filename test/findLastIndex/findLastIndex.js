const findLastIndex = (arr, fn) =>
arr
.map((val, i) => [i, val])
.filter(val => fn(val[1], val[0], arr))
.slice(-1)[0][0];
module.exports = findLastIndex