const expect = require('expect');
const median = require('./median.js');

test('Testing median', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof median === 'function').toBeTruthy();
  expect(median([5, 6, 50, 1, -5])).toBe(5);
  expect(median([1, 2, 3])).toBe(2);
});