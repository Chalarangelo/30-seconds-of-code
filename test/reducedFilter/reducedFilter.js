module.exports = (data, keys, fn) =>
data.filter(fn).map(el =>
keys.reduce((acc, key) => {
acc[key] = el[key];
return acc;
}, {})
);