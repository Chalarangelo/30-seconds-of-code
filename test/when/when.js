const when = (pred, whenTrue) => x => (pred(x) ? whenTrue(x) : x);

module.exports = when;