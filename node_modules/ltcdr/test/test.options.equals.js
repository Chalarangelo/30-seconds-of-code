/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('--string <n>', 'pass a string')
  .option('--string2 <n>', 'pass another string')
  .option('--num <n>', 'pass a number', Number);

program.parse('node test --string=Hello --string2 Hello=World --num=5.5'.split(' '));
test('options equals', function (t) {
  t.equals(program.string, 'Hello');
  t.equals(program.string2, 'Hello=World');
  t.equals(program.num, 5.5);
  t.end();
});
