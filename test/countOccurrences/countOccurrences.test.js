const expect = require('expect');
const countOccurrences = require('./countOccurrences.js');

test('Testing countOccurrences', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof countOccurrences === 'function').toBeTruthy();
  expect(countOccurrences([1, 1, 2, 1, 2, 3], 1)).toEqual(3);
});