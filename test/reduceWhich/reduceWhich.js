const reduceWhich = (arr, comparator = (a, b) => a - b) =>
arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));
module.exports = reduceWhich