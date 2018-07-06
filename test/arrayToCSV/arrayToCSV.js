const arrayToCSV = (arr, delimiter = ',') =>
arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
module.exports = arrayToCSV;