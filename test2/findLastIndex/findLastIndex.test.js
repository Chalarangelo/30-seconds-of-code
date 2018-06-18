const expect = require('expect');
const findLastIndex = require('./findLastIndex.js');

test('Testing findLastIndex', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof findLastIndex === 'function').toBeTruthy();
  expect(findLastIndex([1, 2, 3, 4], n => n % 2 === 1)).toBe(2);
});
