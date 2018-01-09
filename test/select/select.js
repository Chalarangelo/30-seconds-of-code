module.exports = (from, selector) =>
selector.split('.').reduce((prev, cur) => prev && prev[cur], from);