const reduceSuccessive = (arr, fn, acc) =>
arr.reduce((res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res), [acc]);
module.exports = reduceSuccessive