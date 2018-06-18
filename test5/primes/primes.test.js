const expect = require('expect');
const primes = require('./primes.js');

test('Testing primes', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof primes === 'function').toBeTruthy();
  expect(primes(10)).toEqual([2, 3, 5, 7]);
});