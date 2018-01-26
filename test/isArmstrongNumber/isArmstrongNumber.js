const isArmstrongNumber = digits =>
(arr => arr.reduce((a, d) => a + parseInt(d) ** arr.length, 0) == digits)(
(digits + '').split('')
);
module.exports = isArmstrongNumber