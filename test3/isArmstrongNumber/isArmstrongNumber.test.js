const expect = require('expect');
const isArmstrongNumber = require('./isArmstrongNumber.js');

test('Testing isArmstrongNumber', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isArmstrongNumber === 'function').toBeTruthy();
});