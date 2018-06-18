const expect = require('expect');
const isSorted = require('./isSorted.js');


  test('isSorted is a Function', () => {
  expect(isSorted).toBeInstanceOf(Function);
});
  t.equal(isSorted([0, 1, 2]), 1, 'Array is sorted in ascending order');
  t.equal(isSorted([0, 1, 2, 2]), 1, 'Array is sorted in ascending order');
  t.equal(isSorted([-4, -3, -2]), 1, 'Array is sorted in ascending order');
  t.equal(isSorted([0, 0, 1, 2]), 1, 'Array is sorted in ascending order');
  t.equal(isSorted([2, 1, 0]), -1, 'Array is sorted in descending order');
  t.equal(isSorted([2, 2, 1, 0]), -1, 'Array is sorted in descending order');
  t.equal(isSorted([-2, -3, -4]), -1, 'Array is sorted in descending order');
  t.equal(isSorted([2, 1, 0, 0]), -1, 'Array is sorted in descending order');
  t.equal(isSorted([]), undefined, 'Array is empty');
  t.equal(isSorted([1]), 0, 'Array is not sorted, direction changed in array');
  t.equal(isSorted([1, 2, 1]), 0, 'Array is not sorted, direction changed in array');
  

