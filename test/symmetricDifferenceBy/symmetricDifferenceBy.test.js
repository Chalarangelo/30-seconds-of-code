const test = require('tape');
const symmetricDifferenceBy = require('./symmetricDifferenceBy.js');

test('Testing symmetricDifferenceBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof symmetricDifferenceBy === 'function', 'symmetricDifferenceBy is a Function');
  t.deepEqual(symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor), [ 1.2, 3.4 ], 'Returns the symmetric difference between two arrays, after applying the provided function to each array element of both');
  //t.deepEqual(symmetricDifferenceBy(args..), 'Expected');
  //t.equal(symmetricDifferenceBy(args..), 'Expected');
  //t.false(symmetricDifferenceBy(args..), 'Expected');
  //t.throws(symmetricDifferenceBy(args..), 'Expected');
  t.end();
});
