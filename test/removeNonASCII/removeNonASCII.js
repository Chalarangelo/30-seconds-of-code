const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');
module.exports = removeNonASCII