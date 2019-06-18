const {initializeArrayWithRange} = require('./_30s.js');

test('initializeArrayWithRange is a Function', () => {
  expect(initializeArrayWithRange).toBeInstanceOf(Function);
});
test('Initializes an array containing the numbers in the specified range (witout start value)', () => {
  expect(initializeArrayWithRange(5)).toEqual([0, 1, 2, 3, 4, 5]);
});
test('Initializes an array containing the numbers in the specified range', () => {
  expect(initializeArrayWithRange(7, 3)).toEqual([3, 4, 5, 6, 7]);
});
test('Initializes an array containing the numbers in the specified range (with step)', () => {
  expect(initializeArrayWithRange(9, 0, 2)).toEqual([0, 2, 4, 6, 8]);
});
