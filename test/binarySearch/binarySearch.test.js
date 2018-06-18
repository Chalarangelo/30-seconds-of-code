const expect = require('expect');
const binarySearch = require('./binarySearch.js');


  test('binarySearch is a Function', () => {
  expect(binarySearch).toBeInstanceOf(Function);
});
  t.equal(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6), 2, 'Finds item in array');
  t.equal(binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 21), -1, 'Returns -1 when not found');
  t.equal(binarySearch([], 21), -1, 'Works with empty arrays');
  t.equal(binarySearch([1], 1), 0, "Works for one element arrays");
  
