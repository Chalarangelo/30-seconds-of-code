const expect = require('expect');
const isPrime = require('./isPrime.js');

test('Testing isPrime', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isPrime === 'function').toBeTruthy();
  expect(isPrime(11)).toBe(true);
});