module.exports = anagrams = str => {
if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
return str
.split('')
.reduce(
(acc, letter, i) =>
acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
[]
);
};