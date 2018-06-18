const expect = require('expect');
const takeRight = require('./takeRight.js');

test('Testing takeRight', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof takeRight === 'function').toBeTruthy();
  expect(takeRight([1, 2, 3], 2)).toEqual([2, 3]);
  expect(takeRight([1, 2, 3])).toEqual([3]);
});