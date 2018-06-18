const expect = require('expect');
const inRange = require('./inRange.js');

test('Testing inRange', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof inRange === 'function').toBeTruthy();
  expect(inRange(3, 2, 5)).toBe(true);
  expect(inRange(3, 4)).toBe(true);
  expect(inRange(2, 3, 5)).toBe(false);
  expect(inRange(3, 2)).toBe(false);
});