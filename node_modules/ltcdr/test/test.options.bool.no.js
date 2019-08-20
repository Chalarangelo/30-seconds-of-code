/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('-p, --pepper', 'add pepper')
  .option('-c|--no-cheese', 'remove cheese');

program.parse(['node', 'test', '--no-cheese']);
test('options bool no', function (t) {
  t.equals(program.pepper, undefined);
  t.equals(program.cheese, false);
  t.end();
});