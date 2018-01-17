const select = (from, ...selectors) =>
[...selectors].map(s => s.split('.').reduce((prev, cur) => prev && prev[cur], from));
 module.exports = select