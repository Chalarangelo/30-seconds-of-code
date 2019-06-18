const {standardDeviation} = require('./_30s.js');

test('standardDeviation is a Function', () => {
  expect(standardDeviation).toBeInstanceOf(Function);
});
test('Returns the standard deviation of an array of numbers', () => {
  expect(standardDeviation([10, 2, 38, 23, 38, 23, 21])).toBeCloseTo(13.284434142114991, 5);
});
test('Returns the standard deviation of an array of numbers', () => {
  expect(standardDeviation([10, 2, 38, 23, 38, 23, 21], true)).toBeCloseTo(12.29899614287479, 5);
});
