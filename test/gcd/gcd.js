module.exports = gcd = (...arr) => {
const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
return [...arr].reduce((a, b) => _gcd(a, b));
};