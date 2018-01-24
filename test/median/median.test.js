const test = require('tape');
const median = require('./median.js');

test('Testing median', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof median === 'function', 'median is a Function');
  t.equal(median([5, 6, 50, 1, -5]), 5, "Returns the median of an array of numbers");
  t.equal(median([1, 2, 3]), 2, "Returns the median of an array of numbers");
  //t.deepEqual(median(args..), 'Expected');
  //t.equal(median(args..), 'Expected');
  //t.false(median(args..), 'Expected');
  //t.throws(median(args..), 'Expected');
  t.end();
});