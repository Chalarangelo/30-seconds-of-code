const expect = require('expect');
const binarySearch = require('./binarySearch.js');

test('Testing binarySearch', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof binarySearch === 'function').toBeTruthy();
  //t.deepEqual(binarySearch(args..), 'Expected');
  expect(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6)).toBe(2);
  expect(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 21)).toBe(-1);
  expect(binarySearch([], 21)).toBe(-1);
  expect(binarySearch([1], 1)).toBe(0);
});