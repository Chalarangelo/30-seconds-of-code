/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('--longflag [value]', 'A long only flag with a value');

program.parse(['node', 'test', '--longflag', 'something']);
test('option large only with value', function (t) {
  t.equals(program.longflag, 'something');
  t.end();
});