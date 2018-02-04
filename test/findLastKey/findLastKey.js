const findLastKey = (obj, fn) =>
Object.keys(obj)
.reverse()
.find(key => fn(obj[key], key, obj));
module.exports = findLastKey;