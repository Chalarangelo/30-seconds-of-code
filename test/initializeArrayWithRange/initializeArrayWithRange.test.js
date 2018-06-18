const expect = require('expect');
const initializeArrayWithRange = require('./initializeArrayWithRange.js');

test('initializeArrayWithRange is a Function', () => {
  expect(initializeArrayWithRange).toBeInstanceOf(Function);
});
test('Initializes an array containing the numbers in the specified range', () => {
  expect(initializeArrayWithRange(5)).toEqual([0, 1, 2, 3, 4, 5]);
});
