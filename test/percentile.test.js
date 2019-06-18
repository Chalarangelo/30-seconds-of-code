const {percentile} = require('./_30s.js');

test('percentile is a Function', () => {
  expect(percentile).toBeInstanceOf(Function);
});
test('Uses the percentile formula to calculate how many numbers in the given array are less or equal to the given value.', () => {
  expect(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6)).toBe(55);
});
