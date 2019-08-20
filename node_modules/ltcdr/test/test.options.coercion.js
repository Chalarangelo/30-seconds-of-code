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
  .option('-i, --int <n>', 'pass an int', parseInt)
  .option('-n, --num <n>', 'pass a number', Number)
  .option('-f, --float <n>', 'pass a float', parseFloat)
  .option('-r, --range <a..b>', 'pass a range', parseRange);

program.parse('node test -i 5.5 -f 5.5 -n 15.99 -r 1..5'.split(' '));
test('option coercion', function(t) {
  t.equals(program.int, 5);
  t.equals(program.num, 15.99);
  t.equals(program.float, 5.5);
  t.deepEquals(program.range, [1,5]);
  t.end();
});