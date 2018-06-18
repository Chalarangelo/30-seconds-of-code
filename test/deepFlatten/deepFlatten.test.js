const expect = require('expect');
const deepFlatten = require('./deepFlatten.js');

test('Testing deepFlatten', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof deepFlatten === 'function').toBeTruthy();
  expect(deepFlatten([1, [2], [[3], 4], 5])).toEqual([1, 2, 3, 4, 5]);
});