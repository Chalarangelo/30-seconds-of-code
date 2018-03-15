const mapAsync = (arr, fn) =>
Promise.all(arr.map(fn));
module.exports = mapAsync;