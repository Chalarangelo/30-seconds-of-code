const countBy = (arr, fn) =>
arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
acc[val] = (acc[val] || 0) + 1;
return acc;
}, {});
module.exports = countBy;