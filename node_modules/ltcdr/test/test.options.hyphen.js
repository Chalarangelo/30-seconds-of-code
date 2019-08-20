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
  .option('-a, --alpha <a>', 'hyphen')
  .option('-b, --bravo <b>', 'hyphen')
  .option('-c, --charlie <c>', 'hyphen');

program.parse('node test -a - --bravo - --charlie=- - -- -'.split(' '));
test('options hyphen', function(t) {
  t.equals(program.alpha, '-', 'alpha is hyphen');
  t.equals(program.bravo, '-', 'bravo is hyphen');
  t.equals(program.charlie, '-', 'charlie is hyphen');
  t.equals(program.args[0], '-', 'args[0] is hypthen');
  t.equals(program.args[1], '-', 'args[1] is hyphen');
  t.end();
});