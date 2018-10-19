const expect = require('expect');
const {isPrime} = require('./_30s.js');

test('isPrime is a Function', () => {
  expect(isPrime).toBeInstanceOf(Function);
});
test('passed number is a prime', () => {
  expect(isPrime(11)).toBeTruthy();
});
