const expect = require('expect');
const isSet = require('./isSet.js');

test('Testing isSet', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isSet === 'function').toBeTruthy();
});