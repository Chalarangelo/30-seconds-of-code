const expect = require('expect');
const isDivisible = require('./isDivisible.js');

test('Testing isDivisible', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isDivisible === 'function').toBeTruthy();
  expect(isDivisible(6, 3)).toBe(true);
});