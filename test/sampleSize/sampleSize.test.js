const test = require('tape');
const sampleSize = require('./sampleSize.js');

test('Testing sampleSize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sampleSize === 'function', 'sampleSize is a Function');
  const arr = [3,7,9,11];
  t.equal(sampleSize(arr).length, 1, 'Returns a single element without n specified');
  t.true(sampleSize(arr, 2).every(x => arr.includes(x)), 'Returns a random sample of specified size from an array');
  t.equal(sampleSize(arr, 5).length, 4, 'Returns all elements in an array if n >= length');
  t.deepEqual(sampleSize([], 2), [], 'Returns an empty array if original array is empty');
  t.deepEqual(sampleSize(arr, 0), [], 'Returns an empty array if n = 0');
  //t.deepEqual(sampleSize(args..), 'Expected');
  //t.equal(sampleSize(args..), 'Expected');
  //t.false(sampleSize(args..), 'Expected');
  //t.throws(sampleSize(args..), 'Expected');
  t.end();
});
