module.exports = groupBy = (arr, func) =>
arr.map(typeof func === 'function' ? func : val => val[func]).reduce((acc, val, i) => {
acc[val] = (acc[val] || []).concat(arr[i]);
return acc;
}, {});