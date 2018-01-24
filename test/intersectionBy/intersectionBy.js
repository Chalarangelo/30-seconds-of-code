const intersectionBy = (a, b, fn) => {
const s = new Set(b.map(x => fn(x)));
return a.filter(x => s.has(fn(x)));
};
module.exports = intersectionBy