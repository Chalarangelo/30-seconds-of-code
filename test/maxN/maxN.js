const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

module.exports = maxN;