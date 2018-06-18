const expect = require('expect');
const removeVowels = require('./removeVowels.js');

test('Testing removeVowels', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof removeVowels === 'function').toBeTruthy();
});