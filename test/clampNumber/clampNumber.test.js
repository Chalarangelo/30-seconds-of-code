const expect = require('expect');
const clampNumber = require('./clampNumber.js');

test('Testing clampNumber', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof clampNumber === 'function').toBeTruthy();
  expect(clampNumber(2, 3, 5)).toBe(3);
});