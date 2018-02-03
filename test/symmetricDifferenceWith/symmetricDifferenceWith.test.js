const test = require('tape');
const symmetricDifferenceWith = require('./symmetricDifferenceWith.js');

test('Testing symmetricDifferenceWith', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof symmetricDifferenceWith === 'function', 'symmetricDifferenceWith is a Function');
  t.deepEqual(symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
), [1, 1.2, 3.9], 'Returns the symmetric difference between two arrays, using a provided function as a comparator');
  //t.deepEqual(symmetricDifferenceWith(args..), 'Expected');
  //t.equal(symmetricDifferenceWith(args..), 'Expected');
  //t.false(symmetricDifferenceWith(args..), 'Expected');
  //t.throws(symmetricDifferenceWith(args..), 'Expected');
  t.end();
});
