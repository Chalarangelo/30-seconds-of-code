const test = require('tape');
const sample = require('./sample.js');

test('Testing sample', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sample === 'function', 'sample is a Function');
  const arr = [3,7,9,11];
  t.true(arr.includes(sample(arr)), 'Returns a random element from the array');
  t.equal(sample([1]), 1, 'Works for single-element arrays');
  t.equal(sample([]), undefined, 'Returns undefined for empty array');
  //t.deepEqual(sample(args..), 'Expected');
  //t.equal(sample(args..), 'Expected');
  //t.false(sample(args..), 'Expected');
  //t.throws(sample(args..), 'Expected');
  t.end();
});
