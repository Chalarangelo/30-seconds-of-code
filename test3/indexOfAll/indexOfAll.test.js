const expect = require('expect');
const indexOfAll = require('./indexOfAll.js');

test('Testing indexOfAll', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof indexOfAll === 'function').toBeTruthy();
  expect(indexOfAll([1, 2, 3, 1, 2, 3], 1)).toEqual([0,3]);
  expect(indexOfAll([1, 2, 3], 4)).toEqual([]);
});