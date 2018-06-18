const expect = require('expect');
const isSorted = require('./isSorted.js');


  test('isSorted is a Function', () => {
  expect(isSorted).toBeInstanceOf(Function);
});
  test('Array is sorted in ascending order', () => {
  expect(isSorted([0, 1, 2]), 1).toBe()
});
  test('Array is sorted in ascending order', () => {
  expect(isSorted([0, 1, 2, 2]), 1).toBe()
});
  test('Array is sorted in ascending order', () => {
  expect(isSorted([-4, -3, -2]), 1).toBe()
});
  test('Array is sorted in ascending order', () => {
  expect(isSorted([0, 0, 1, 2]), 1).toBe()
});
  test('Array is sorted in descending order', () => {
  expect(isSorted([2, 1, 0]), -1).toBe()
});
  test('Array is sorted in descending order', () => {
  expect(isSorted([2, 2, 1, 0]), -1).toBe()
});
  test('Array is sorted in descending order', () => {
  expect(isSorted([-2, -3, -4]), -1).toBe()
});
  test('Array is sorted in descending order', () => {
  expect(isSorted([2, 1, 0, 0]), -1).toBe()
});
  test('Array is empty', () => {
  expect(isSorted([]), undefined).toBe()
});
  test('Array is not sorted, direction changed in array', () => {
  expect(isSorted([1]), 0).toBe()
});
  test('Array is not sorted, direction changed in array', () => {
  expect(isSorted([1, 2, 1]), 0).toBe()
});
  

