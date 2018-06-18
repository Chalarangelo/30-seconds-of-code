const expect = require('expect');
const sortedIndex = require('./sortedIndex.js');

test('Testing sortedIndex', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sortedIndex === 'function').toBeTruthy();
  expect(sortedIndex([5, 3, 2, 1], 4)).toBe(1);
  expect(sortedIndex([30, 50], 40)).toBe(1);
});