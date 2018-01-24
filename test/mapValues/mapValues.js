const mapValues = (obj, fn) =>
Object.keys(obj).reduce((acc, k) => {
acc[k] = fn(obj[k], k, obj);
return acc;
}, {});
module.exports = mapValues