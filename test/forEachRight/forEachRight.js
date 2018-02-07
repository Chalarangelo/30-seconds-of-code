const forEachRight = (arr, callback) =>
arr
.slice(0)
.reverse()
.forEach(callback);
module.exports = forEachRight;