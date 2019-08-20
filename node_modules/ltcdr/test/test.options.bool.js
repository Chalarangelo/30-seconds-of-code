
/**
 * Module dependencies.
 */

var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('-p, --pepper', 'add pepper')
  .option('-c, --no-cheese', 'remove cheese');

program.parse(['node', 'test', '--pepper']);
test('options camelcase', function (t) {
  t.ok(program.pepper);
  t.ok(program.cheese);
  t.end();
});