/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('--verbose', 'do stuff');

program.parse(['node', 'test', '--verbose']);
test('options large only', function (t) {
  t.equals(program.verbose, true);
  t.end();
});