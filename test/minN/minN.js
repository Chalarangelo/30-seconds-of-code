const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
 module.exports = minN