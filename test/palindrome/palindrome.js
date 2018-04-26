const palindrome = str => {
const s = str.toLowerCase().replace(/[\W_]/g, '');
return s === [...s].reverse().join('');
};
module.exports = palindrome;