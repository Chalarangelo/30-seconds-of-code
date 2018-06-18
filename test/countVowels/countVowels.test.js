const expect = require('expect');
const countVowels = require('./countVowels.js');

test('Testing countVowels', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof countVowels === 'function').toBeTruthy();
});