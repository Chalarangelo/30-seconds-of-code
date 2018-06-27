const arrayToCSV = (arr, delimiter = ',') => arr.map(v => v.join(delimiter)).join('\n');
module.exports = arrayToCSV;