const expect = require('expect');
const isEven = require('./isEven.js');

test('Testing isEven', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isEven === 'function').toBeTruthy();
  expect(isEven(4)).toBe(true);
  expect(isEven(5)).toBeFalsy();
});