/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('-c, --cflags <cflags>', 'pass options/flags to a compiler')
  .option('-o, --other', 'just some other option')
  .option('-x, --xother', 'just some other option')
  .option('-y, --yother', 'just some other option')
  .option('-z, --zother', 'just some other option');


program.parse(['node', 'test', '--cflags', '-DDEBUG', '-o', '-xyz']);
test('cflags', function(t) {
  t.equals(program.cflags, '-DDEBUG');
  t.ok(program.other);
  t.ok(program.xother);
  t.ok(program.yother);
  t.ok(program.zother);
  t.end();
});
