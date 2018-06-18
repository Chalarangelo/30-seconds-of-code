const expect = require('expect');
const initializeArrayWithValues = require('./initializeArrayWithValues.js');

test('Testing initializeArrayWithValues', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof initializeArrayWithValues === 'function').toBeTruthy();
  expect(initializeArrayWithValues(5, 2)).toEqual([2, 2, 2, 2, 2]);
});