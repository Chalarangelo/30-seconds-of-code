/**
 * Module dependencies.
 */

var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('-f, --foo', 'add some foo')
  .option('-b, --bar', 'add some bar');

program.parse(['node', 'test', '--foo', '--', '--bar', 'baz']);
test('literal args', function (t) {
  t.ok(program.foo);
  t.equal(program.bar, undefined);
  t.deepEqual(program.args, ['--bar', 'baz']);
  t.end();
});