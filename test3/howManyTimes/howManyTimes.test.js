const expect = require('expect');
const howManyTimes = require('./howManyTimes.js');

test('Testing howManyTimes', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof howManyTimes === 'function').toBeTruthy();
});