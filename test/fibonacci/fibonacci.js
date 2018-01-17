const fibonacci = n =>
Array.from({ length: n }).reduce(
(acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
[]
);
 module.exports = fibonacci