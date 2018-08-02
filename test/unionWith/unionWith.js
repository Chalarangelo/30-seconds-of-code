const unionWith = (a, b, comp) =>
  Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)]));

module.exports = unionWith;