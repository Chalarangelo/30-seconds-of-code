const invertKeyValues = obj =>
Object.keys(obj).reduce((acc, key) => {
acc[obj[key]] = key;
return acc;
}, {});
 module.exports = invertKeyValues