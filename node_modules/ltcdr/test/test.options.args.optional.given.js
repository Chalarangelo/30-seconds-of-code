/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('-c, --cheese [type]', 'optionally specify the type of cheese');

program.parse(['node', 'test', '--cheese', 'feta']);
test('options camelcase', function (t) {
  t.equals(program.cheese, 'feta');
  t.end();
});