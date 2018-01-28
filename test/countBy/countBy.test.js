const test = require('tape');
const countBy = require('./countBy.js');

test('Testing countBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof countBy === 'function', 'countBy is a Function');
  t.deepEqual(countBy([6.1, 4.2, 6.3], Math.floor), {4: 1, 6: 2}, 'Works for functions');
  t.deepEqual(countBy(['one', 'two', 'three'], 'length'), {3: 2, 5: 1}, 'Works for property names');
  //t.deepEqual(countBy(args..), 'Expected');
  //t.equal(countBy(args..), 'Expected');
  //t.false(countBy(args..), 'Expected');
  //t.throws(countBy(args..), 'Expected');
  t.end();
});
