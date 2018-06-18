const expect = require('expect');
const take = require('./take.js');

test('Testing take', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof take === 'function').toBeTruthy();
  expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  expect(take([1, 2, 3], 0)).toEqual([]);
});
