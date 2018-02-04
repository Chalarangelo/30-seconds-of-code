const averageBy = (arr, fn) =>
arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
arr.length;
module.exports = averageBy;