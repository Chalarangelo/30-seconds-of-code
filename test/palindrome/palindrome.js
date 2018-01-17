const palindrome = str => {
const s = str.toLowerCase().replace(/[\W_]/g, '');
return (
s ===
s
.split('')
.reverse()
.join('')
);
};
 module.exports = palindrome