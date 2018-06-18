const expect = require('expect');
const quickSort = require('./quickSort.js');

test('Testing quickSort', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof quickSort === 'function').toBeTruthy();
  expect(quickSort([5, 6, 4, 3, 1, 2])).toEqual([1, 2, 3, 4, 5, 6]);
  expect(quickSort([-1, 0, -2])).toEqual([-2, -1, 0]);
  expect(() => quickSort()).toThrow();
  expect(() => quickSort(123)).toThrow();
  expect(() => quickSort({ 234: string})).toThrow();
  expect(() => quickSort(null)).toThrow();
  expect(() => quickSort(undefined)).toThrow();

  let start = new Date().getTime();
  quickSort([11, 1, 324, 23232, -1, 53, 2, 524, 32, 13, 156, 133, 62, 12, 4]);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
