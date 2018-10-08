const without = (arr, ...args) => arr.filter(v => !args.includes(v));
module.exports = without;
