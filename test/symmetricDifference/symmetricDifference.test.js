const test = require('tape');
const symmetricDifference = require('./symmetricDifference.js');

test('Testing symmetricDifference', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof symmetricDifference === 'function', 'symmetricDifference is a Function');
  t.deepEqual(symmetricDifference([1, 2, 3], [1, 2, 4]), [3, 4], "Returns the symmetric difference between two arrays.");
  //t.deepEqual(symmetricDifference(args..), 'Expected');
  //t.equal(symmetricDifference(args..), 'Expected');
  //t.false(symmetricDifference(args..), 'Expected');
  //t.throws(symmetricDifference(args..), 'Expected');
  t.end();
});