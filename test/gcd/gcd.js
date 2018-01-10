module.exports = (...arr) => {
const _gcd = (x, y) => (!y ? x : _gcd(y, x % y));
return [...arr].reduce((a, b) => _gcd(a, b));
};