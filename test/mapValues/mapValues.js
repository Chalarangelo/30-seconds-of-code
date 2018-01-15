module.exports = mapValues = (obj, fn) =>
Object.keys(obj).reduce((acc, k) => {
acc[k] = fn(obj[k], k, obj);
return acc;
}, {});