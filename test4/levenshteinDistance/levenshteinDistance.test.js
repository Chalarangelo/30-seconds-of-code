const expect = require('expect');
const levenshteinDistance = require('./levenshteinDistance.js');

test('Testing levenshteinDistance', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof levenshteinDistance === 'function').toBeTruthy();
});