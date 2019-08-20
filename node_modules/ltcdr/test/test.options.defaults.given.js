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

program.parse(['node', 'test', '--anchovies', '--onions', '--olives', '--no-sauce', '--crust', 'thin', '--cheese', 'wensleydale']);
test('options defaults given', function (t) {
  t.equals(program.anchovies, true);
  t.equals(program.onions, true);
  t.equals(program.olives, 'black');
  t.equals(program.sauce, false);
  t.equals(program.crust, 'thin');
  t.equals(program.cheese, 'wensleydale');
  t.end();
});