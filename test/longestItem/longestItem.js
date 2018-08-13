const longestItem = (...vals) => [...vals].reduce((a, x) => (a.length > x.length ? a : x), []);
module.exports = longestItem;
