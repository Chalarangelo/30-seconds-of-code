const test = require('tape');
const primes = require('./primes.js');

test('Testing primes', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof primes === 'function', 'primes is a Function');
  t.deepEqual(primes(10), [2, 3, 5, 7], "Generates primes up to a given number, using the Sieve of Eratosthenes.");
  //t.deepEqual(primes(args..), 'Expected');
  //t.equal(primes(args..), 'Expected');
  //t.false(primes(args..), 'Expected');
  //t.throws(primes(args..), 'Expected');
  t.end();
});