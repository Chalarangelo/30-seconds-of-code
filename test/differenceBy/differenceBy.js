const differenceBy = (a, b, fn) => {
const s = new Set(b.map(v => fn(v)));
return a.filter(x => !s.has(fn(x)));
};
module.exports = differenceBy