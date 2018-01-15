module.exports = merge = (...objs) =>
[...objs].reduce(
(acc, obj) =>
Object.keys(obj).reduce((a, k) => {
acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
return acc;
}, {}),
{}
);