const expect = require('expect');
const {initializeArrayWithRangeRight} = require('./_30s.js');

test('initializeArrayWithRangeRight is a Function', () => {
  expect(initializeArrayWithRangeRight).toBeInstanceOf(Function);
});
test('Initializes an array containing the numbers in the specified range (witout start value)', () => {
  expect(initializeArrayWithRangeRight(5)).toEqual([5, 4, 3, 2, 1, 0]);
});
test('Initializes an array containing the numbers in the specified range', () => {
  expect(initializeArrayWithRangeRight(7, 3)).toEqual([7, 6, 5, 4, 3]);
});
test('Initializes an array containing the numbers in the specified range (with step)', () => {
  expect(initializeArrayWithRangeRight(9, 0, 2)).toEqual([8, 6, 4, 2, 0]);
});
