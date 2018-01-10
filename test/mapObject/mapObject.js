module.exports = mapObject = (arr, fn) =>
(a => (
(a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
))();