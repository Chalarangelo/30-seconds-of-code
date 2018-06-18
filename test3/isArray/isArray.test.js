const expect = require('expect');
const isArray = require('./isArray.js');

test('Testing isArray', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isArray === 'function').toBeTruthy();
  expect(isArray([1])).toBe(true);
  expect(isArray('array')).toBe(false);
});