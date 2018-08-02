const unionBy = (a, b, fn) => {
  const s = new Set(a.map(v => fn(v)));
  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
};

module.exports = unionBy;