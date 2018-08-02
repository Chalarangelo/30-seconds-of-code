const removeVowels = (str, repl = '') => str.replace(/[aeiou]/gi,repl);

module.exports = removeVowels;