const expect = require('expect');
const isSorted = require('./isSorted.js');

test('Testing isSorted', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isSorted === 'function').toBeTruthy();
  //t.deepEqual(isSorted(args..), 'Expected');
  expect(isSorted([0, 1, 2])).toBe(1);
  expect(isSorted([0, 1, 2, 2])).toBe(1);
  expect(isSorted([-4, -3, -2])).toBe(1);
  expect(isSorted([0, 0, 1, 2])).toBe(1);
  expect(isSorted([2, 1, 0])).toBe(-1);
  expect(isSorted([2, 2, 1, 0])).toBe(-1);
  expect(isSorted([-2, -3, -4])).toBe(-1);
  expect(isSorted([2, 1, 0, 0])).toBe(-1);
  expect(isSorted([])).toBe(undefined);
  expect(isSorted([1])).toBe(0);
  expect(isSorted([1, 2, 1])).toBe(0);
});
