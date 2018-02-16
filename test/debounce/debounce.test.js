const test = require('tape');
const debounce = require('./debounce.js');

test('Testing debounce', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof debounce === 'function', 'debounce is a Function');
  debounce(() => {t.pass('Works as expected');}, 250);
  //t.deepEqual(debounce(args..), 'Expected');
  //t.equal(debounce(args..), 'Expected');
  //t.false(debounce(args..), 'Expected');
  //t.throws(debounce(args..), 'Expected');
  t.end();
});
