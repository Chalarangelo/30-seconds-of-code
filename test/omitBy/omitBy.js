const omitBy = (obj, fn) =>
Object.keys(obj)
.filter(k => !fn(obj[k], k))
.reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
 module.exports = omitBy