const expect = require('expect');
const {countOccurrences} = require('./_30s.js');

test('countOccurrences is a Function', () => {
  expect(countOccurrences).toBeInstanceOf(Function);
});
test('Counts the occurrences of a value in an array', () => {
  expect(countOccurrences([1, 1, 2, 1, 2, 3], 1)).toEqual(3);
});
test('Works with different types in the same array', () => {
  expect(countOccurrences([1, 1, 2, 1, 2, 3, '1', true], 1)).toEqual(3);
});
