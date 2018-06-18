const expect = require('expect');
const throttle = require('./throttle.js');

test('Testing throttle', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof throttle === 'function').toBeTruthy();
});
