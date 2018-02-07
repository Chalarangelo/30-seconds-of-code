const longestItem = (...vals) => [...vals].sort((a, b) => b.length - a.length)[0];
module.exports = longestItem;