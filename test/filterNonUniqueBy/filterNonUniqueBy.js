const filterNonUniqueBy = (arr, fn) =>
arr.filter((v, i) => arr.every((x, j) => i == j == fn(v, x, i, j)));
module.exports = filterNonUniqueBy;