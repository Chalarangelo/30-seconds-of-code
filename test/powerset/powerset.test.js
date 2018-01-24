const test = require('tape');
const powerset = require('./powerset.js');

test('Testing powerset', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof powerset === 'function', 'powerset is a Function');
  t.deepEqual(powerset([1, 2]), [[], [1], [2], [2,1]], "Returns the powerset of a given array of numbers.");
  //t.deepEqual(powerset(args..), 'Expected');
  //t.equal(powerset(args..), 'Expected');
  //t.false(powerset(args..), 'Expected');
  //t.throws(powerset(args..), 'Expected');
  t.end();
});