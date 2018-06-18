const expect = require('expect');
const primes = require('./primes.js');


  test('primes is a Function', () => {
  expect(primes).toBeInstanceOf(Function);
});
  t.deepEqual(primes(10), [2, 3, 5, 7], "Generates primes up to a given number, using the Sieve of Eratosthenes.");
  
