const {powerset} = require('./_30s.js');

test('powerset is a Function', () => {
  expect(powerset).toBeInstanceOf(Function);
});
test('Returns the powerset of a given array of numbers.', () => {
  expect(powerset([1, 2])).toEqual([[], [1], [2], [2, 1]]);
});
