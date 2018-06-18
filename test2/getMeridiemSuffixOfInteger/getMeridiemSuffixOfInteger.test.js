const expect = require('expect');
const getMeridiemSuffixOfInteger = require('./getMeridiemSuffixOfInteger.js');

test('Testing getMeridiemSuffixOfInteger', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof getMeridiemSuffixOfInteger === 'function').toBeTruthy();
});