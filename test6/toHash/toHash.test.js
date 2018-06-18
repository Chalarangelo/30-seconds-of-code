const expect = require('expect');
const toHash = require('./toHash.js');

test('Testing toHash', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toHash === 'function').toBeTruthy();
});