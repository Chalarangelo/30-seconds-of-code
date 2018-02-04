const test = require('tape');
const binarySearch = require('./binarySearch.js');

test('Testing binarySearch', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof binarySearch === 'function', 'binarySearch is a Function');
  //t.deepEqual(binarySearch(args..), 'Expected');
  t.equal(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6), 2, 'Finds item in array');
  t.equal(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 21), -1, 'Returns -1 when not found');
  t.equal(binarySearch([], 21), -1, 'Works with empty arrays');
  //t.false(binarySearch(args..), 'Expected');
  //t.throws(binarySearch(args..), 'Expected');
  t.end();
});