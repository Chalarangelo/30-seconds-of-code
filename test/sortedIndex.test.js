const {sortedIndex} = require('./_30s.js');

test('sortedIndex is a Function', () => {
  expect(sortedIndex).toBeInstanceOf(Function);
});
test('Returns the lowest index at which value should be inserted into array in order to maintain its sort order.', () => {
  expect(sortedIndex([5, 3, 2, 1], 4)).toBe(1);
});
test('Returns the lowest index at which value should be inserted into array in order to maintain its sort order.', () => {
  expect(sortedIndex([30, 50], 40)).toBe(1);
});
test('Returns the lowest index at which value should be inserted into array in order to maintain its sort order.', () => {
  expect(sortedIndex([30, 50], 60)).toBe(2);
});
