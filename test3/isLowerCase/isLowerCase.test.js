const expect = require('expect');
const isLowerCase = require('./isLowerCase.js');

test('Testing isLowerCase', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isLowerCase === 'function').toBeTruthy();
  expect(isLowerCase('abc')).toBe(true);
  expect(isLowerCase('a3@$')).toBe(true);
  expect(isLowerCase('A3@$')).toBe(false);
});