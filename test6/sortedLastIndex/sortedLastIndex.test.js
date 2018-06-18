const expect = require('expect');
const sortedLastIndex = require('./sortedLastIndex.js');

test('Testing sortedLastIndex', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sortedLastIndex === 'function').toBeTruthy();
  expect(sortedLastIndex([10, 20, 30, 30, 40], 30)).toBe(4);
});
