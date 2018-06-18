const fibonacciCountUntilNum = num =>
Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
module.exports = fibonacciCountUntilNum;