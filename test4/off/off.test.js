const expect = require('expect');
const off = require('./off.js');

test('Testing off', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof off === 'function').toBeTruthy();
});
