const truncateString = (str, num) =>
str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
 module.exports = truncateString