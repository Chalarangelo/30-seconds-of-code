const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);

module.exports = sum;