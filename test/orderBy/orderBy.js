const orderBy = (arr, props, orders) =>
[...arr].sort((a, b) =>
props.reduce((acc, prop, i) => {
if (acc === 0) {
const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
}
return acc;
}, 0)
);
 module.exports = orderBy