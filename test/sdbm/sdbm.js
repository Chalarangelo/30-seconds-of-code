module.exports = str => {
let arr = str.split('');
return arr.reduce(
(hashCode, currentVal) =>
(hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
0
);
};