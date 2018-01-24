const test = require('tape');
const percentile = require('./percentile.js');

test('Testing percentile', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof percentile === 'function', 'percentile is a Function');
  t.equal(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6), 55, "Uses the percentile formula to calculate how many numbers in the given array are less or equal to the given value.");
  //t.deepEqual(percentile(args..), 'Expected');
  //t.equal(percentile(args..), 'Expected');
  //t.false(percentile(args..), 'Expected');
  //t.throws(percentile(args..), 'Expected');
  t.end();
});