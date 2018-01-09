module.exports = (a, b) => {
const sA = new Set(a),
sB = new Set(b);
return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};