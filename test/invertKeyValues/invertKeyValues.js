const invertKeyValues = (obj, fn) =>
Object.keys(obj).reduce((acc, key) => {
const val = fn ? fn(obj[key]) : obj[key];
acc[val] = acc[val] || [];
acc[val].push(key);
return acc;
}, {});
module.exports = invertKeyValues