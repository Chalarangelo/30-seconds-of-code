const expect = require('expect');
const maxN = require('./maxN.js');

test('Testing maxN', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof maxN === 'function').toBeTruthy();
  expect(maxN([1, 2, 3])).toEqual([3]);
  expect(maxN([1, 2, 3], 2)).toEqual([3, 2]);
});