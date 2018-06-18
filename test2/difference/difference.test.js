const expect = require('expect');
const difference = require('./difference.js');

test('Testing difference', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof difference === 'function').toBeTruthy();
  expect(difference([1, 2, 3], [1, 2, 4])).toEqual([3]);
});