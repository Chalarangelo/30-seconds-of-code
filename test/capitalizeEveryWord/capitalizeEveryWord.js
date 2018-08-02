const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

module.exports = capitalizeEveryWord;