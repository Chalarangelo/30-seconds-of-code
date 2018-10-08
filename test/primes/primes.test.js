const expect = require('expect');
const primes = require('./primes.js');

test('primes is a Function', () => {
  expect(primes).toBeInstanceOf(Function);
});
test('Generates primes up to a given number, using the Sieve of Eratosthenes.', () => {
  expect(primes(10)).toEqual([2, 3, 5, 7]);
});
