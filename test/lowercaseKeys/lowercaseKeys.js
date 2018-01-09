module.exports = obj =>
Object.keys(obj).reduce((acc, key) => {
acc[key.toLowerCase()] = obj[key];
return acc;
}, {});