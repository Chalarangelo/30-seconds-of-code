const {drop} = require('./_30s.js');

test('drop is a Function', () => {
  expect(drop).toBeInstanceOf(Function);
});
test('Works without the last argument', () => {
  expect(drop([1, 2, 3])).toEqual([2, 3]);
});
test('Removes appropriate element count as specified', () => {
  expect(drop([1, 2, 3], 2)).toEqual([3]);
});
test('Empties array given a count greater than length', () => {
  expect(drop([1, 2, 3], 42)).toEqual([]);
});
