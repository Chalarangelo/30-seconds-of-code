const expect = require('expect');
const defer = require('./defer.js');

test('Testing defer', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof defer === 'function').toBeTruthy();
});
