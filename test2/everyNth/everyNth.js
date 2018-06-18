const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
module.exports = everyNth;