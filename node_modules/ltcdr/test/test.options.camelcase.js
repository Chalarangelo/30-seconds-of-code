/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

function parseRange(str) {
  return str.split('..').map(Number);
}

program
  .version('0.0.1')
  .option('-i, --my-int <n>', 'pass an int', parseInt)
  .option('-n, --my-num <n>', 'pass a number', Number)
  .option('-f, --my-fLOAT <n>', 'pass a float', parseFloat)
  .option('-m, --my-very-long-float <n>', 'pass a float', parseFloat)
  .option('-u, --my-URL-count <n>', 'pass a float', parseFloat)
  .option('-r, --my-long-range <a..b>', 'pass a range', parseRange);

program.parse('node test -i 5.5 -f 5.5 -m 6.5 -u 7.5 -n 15.99 -r 1..5'.split(' '));
test('options camelcase', function (t) {
  t.equals(program.myInt, 5);
  t.equals(program.myNum, 15.99);
  t.equals(program.myFLOAT, 5.5);
  t.equals(program.myVeryLongFloat, 6.5);
  t.equals(program.myURLCount, 7.5);
  t.deepEquals(program.myLongRange, [1,5]);
  t.end();
});