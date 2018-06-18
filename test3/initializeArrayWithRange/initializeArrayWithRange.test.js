const expect = require('expect');
const initializeArrayWithRange = require('./initializeArrayWithRange.js');

test('Testing initializeArrayWithRange', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof initializeArrayWithRange === 'function').toBeTruthy();
  expect(initializeArrayWithRange(5)).toEqual([0, 1, 2, 3, 4, 5]);
});