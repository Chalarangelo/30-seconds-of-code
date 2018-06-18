const expect = require('expect');
const isSorted = require('./isSorted.js');

test('isSorted is a Function', () => {
  expect(isSorted).toBeInstanceOf(Function);
});
test('Array is sorted in ascending order', () => {
  expect(isSorted([0, 1, 2])).toBe(1);
});
test('Array is sorted in ascending order', () => {
  expect(isSorted([0, 1, 2, 2])).toBe(1);
});
test('Array is sorted in ascending order', () => {
  expect(isSorted([-4, -3, -2])).toBe(1);
});
test('Array is sorted in ascending order', () => {
  expect(isSorted([0, 0, 1, 2])).toBe(1);
});
test('Array is sorted in descending order', () => {
  expect(isSorted([2, 1, 0])).toBe(-1);
});
test('Array is sorted in descending order', () => {
  expect(isSorted([2, 2, 1, 0])).toBe(-1);
});
test('Array is sorted in descending order', () => {
  expect(isSorted([-2, -3, -4])).toBe(-1);
});
test('Array is sorted in descending order', () => {
  expect(isSorted([2, 1, 0, 0])).toBe(-1);
});
test('Array is empty', () => {
  expect(isSorted([])).toBe(undefined);
});
test('Array is not sorted, direction changed in array', () => {
  expect(isSorted([1])).toBe(0);
});
test('Array is not sorted, direction changed in array', () => {
  expect(isSorted([1, 2, 1])).toBe(0);
});
