const longestItem = (val, ...vals) =>
  [val, ...vals].reduce((a, x) => (x.length > a.length ? x : a));
module.exports = longestItem;
