const expect = require('expect');
const quickSort = require('./quickSort.js');

test('quickSort is a Function', () => {
  expect(quickSort).toBeInstanceOf(Function);
});
test('quickSort([5, 6, 4, 3, 1, 2]) returns [1, 2, 3, 4, 5, 6]', () => {
  expect(quickSort([5, 6, 4, 3, 1, 2])).toEqual([1, 2, 3, 4, 5, 6]);
});
test('quickSort([-1, 0, -2]) returns [-2, -1, 0]', () => {
  expect(quickSort([-1, 0, -2])).toEqual([-2, -1, 0]);
});
test('quickSort() throws an error', () => {
  expect(quickSort()).toThrow();
});
test('quickSort(123) throws an error', () => {
  expect(quickSort(123)).toThrow();
});
test('quickSort({ 234: string}) throws an error', () => {
  expect(quickSort({ 234: string})).toThrow();
});
test('quickSort(null) throws an error', () => {
  expect(quickSort(null)).toThrow();
});
test('quickSort(undefined) throws an error', () => {
  expect(quickSort(undefined)).toThrow();
});
let start = new Date().getTime();
quickSort([11, 1, 324, 23232, -1, 53, 2, 524, 32, 13, 156, 133, 62, 12, 4]);
let end = new Date().getTime();
test('quickSort([11, 1, 324, 23232, -1, 53, 2, 524, 32, 13, 156, 133, 62, 12, 4]) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
