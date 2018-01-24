const omit = (obj, arr) =>
Object.keys(obj)
.filter(k => !arr.includes(k))
.reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
module.exports = omit