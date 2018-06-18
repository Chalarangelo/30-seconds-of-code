const expect = require('expect');
const percentile = require('./percentile.js');

test('Testing percentile', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof percentile === 'function').toBeTruthy();
  expect(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6)).toBe(55);
});