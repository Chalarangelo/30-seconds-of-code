const expect = require('expect');
const zipWith = require('./zipWith.js');

test('Testing zipWith', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof zipWith === 'function').toBeTruthy();
});