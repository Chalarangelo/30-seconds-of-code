const expect = require('expect');
const drop = require('./drop.js');

test('Testing drop', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof drop === 'function').toBeTruthy();
  expect(drop([1, 2, 3])).toEqual([2,3]);
  expect(drop([1, 2, 3], 2)).toEqual([3]);
  expect(drop([1, 2, 3], 42)).toEqual([]);
});
