const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => el === val ? [...acc, i] : acc, []);
module.exports = indexOfAll;
