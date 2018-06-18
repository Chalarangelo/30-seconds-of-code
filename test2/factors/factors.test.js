const expect = require('expect');
const factors = require('./factors.js');

test('Testing factors', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof factors === 'function').toBeTruthy();
});