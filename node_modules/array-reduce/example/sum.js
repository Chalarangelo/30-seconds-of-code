var reduce = require('../');
var xs = [ 1, 2, 3, 4 ];
var sum = reduce(xs, function (acc, x) { return acc + x }, 0);
console.log(sum);
