const expect = require('expect');
const isUndefined = require('./isUndefined.js');

test('Testing isUndefined', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isUndefined === 'function').toBeTruthy();
  expect(isUndefined(undefined)).toBeTruthy();
});
