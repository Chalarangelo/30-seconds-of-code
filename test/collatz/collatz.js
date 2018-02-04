const collatz = n => (n % 2 === 0 ? n / 2 : 3 * n + 1);
module.exports = collatz;