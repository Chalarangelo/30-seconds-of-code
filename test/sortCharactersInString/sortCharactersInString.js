const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');
module.exports = sortCharactersInString;
