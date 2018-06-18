const fibonacciUntilNum = num => {
let n = Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
return Array.from({ length: n }).reduce(
(acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
[]
);
};
module.exports = fibonacciUntilNum;