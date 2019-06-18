const {isPrime} = require('./_30s.js');

test('isPrime is a Function', () => {
  expect(isPrime).toBeInstanceOf(Function);
});
test('passed number is a prime', () => {
  expect(isPrime(11)).toBeTruthy();
});
test('passed number is not a prime', () => {
  expect(isPrime(10)).toBeFalsy();
});
