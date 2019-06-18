const {difference} = require('./_30s.js');

test('difference is a Function', () => {
  expect(difference).toBeInstanceOf(Function);
});
test('Returns the difference between two arrays', () => {
  expect(difference([1, 2, 3], [1, 2, 4])).toEqual([3]);
});
