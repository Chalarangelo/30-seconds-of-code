const {factors} = require('./_30s.js');

test('factors is a Function', () => {
  expect(factors).toBeInstanceOf(Function);
});
test('factors returns the correct array', () => {
  expect(factors(12)).toEqual([2, 3, 4, 6, 12]);
});
test('factors returns the correct array of primes', () => {
  expect(factors(12, true)).toEqual([2, 3]);
});
test('factors returns the correct array for negatives', () => {
  expect(factors(-12)).toEqual([2, -2, 3, -3, 4, -4, 6, -6, 12, -12]);
});
test('factors returns the correct array of primes for negatives', () => {
  expect(factors(-12, true)).toEqual([2, 3]);
});
