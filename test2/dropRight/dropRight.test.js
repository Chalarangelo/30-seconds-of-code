const expect = require('expect');
const dropRight = require('./dropRight.js');

test('Testing dropRight', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof dropRight === 'function').toBeTruthy();
  expect(dropRight([1, 2, 3])).toEqual([1,2]);
  expect(dropRight([1, 2, 3], 2)).toEqual([1]);
  expect(dropRight([1, 2, 3], 42)).toEqual([]);
});