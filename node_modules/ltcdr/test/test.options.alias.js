
/**
 * Module dependencies.
 */

var program = new (require('../').Command)();
var test = require('tape');


test('options alias', function (t) {
  t.plan(3);
  var i = 1;
  program
  .command('initialize <name>')
  .alias('init')
  .alias('i')
  .action(function () {
    t.pass('passed ' + i++);
  });

  program.parse(['node', 'test', 'initialize', 'pepper']);
  program.parse(['node', 'test', 'init', 'pepper']);
  program.parse(['node', 'test', 'i', 'pepper']);
});