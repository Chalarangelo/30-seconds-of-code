const expect = require('expect');
const gcd = require('./gcd.js');

test('Testing gcd', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof gcd === 'function').toBeTruthy();
  expect(gcd(8, 36)).toBe(4);
  expect(gcd(...[12, 8, 32])).toEqual(4);
});