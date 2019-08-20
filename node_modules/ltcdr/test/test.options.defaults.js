/**
 * Module dependencies.
 */

var program = require('../');
var program = new (require('../').Command)();
var test = require('tape');

program
  .version('0.0.1')
  .option('-a, --anchovies', 'Add anchovies?')
  .option('-o, --onions', 'Add onions?', true)
  .option('-v, --olives', 'Add olives? Sorry we only have black.', 'black')
  .option('-s, --no-sauce', 'Uh… okay')
  .option('-r, --crust <type>', 'What kind of crust would you like?', 'hand-tossed')
  .option('-c, --cheese [type]', 'optionally specify the type of cheese', 'mozzarella');

program.parse(['node', 'test']);
test('options defaults', function (t) {
  t.notOk(program.anchovies);
  t.notOk(program.onions);
  t.notOk(program.olives);
  t.equals(program.sauce, true);
  t.equals(program.crust, 'hand-tossed');
  t.equals(program.cheese, 'mozzarella');
  t.end();
});