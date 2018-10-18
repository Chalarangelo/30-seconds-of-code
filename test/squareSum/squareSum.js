const squareSum = (...args) => args.reduce((squareSum, number) => squareSum + Math.pow(number, 2), 0);
module.exports = squareSum;
