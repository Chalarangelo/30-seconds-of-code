const expect = require('expect');
const powerset = require('./powerset.js');

test('Testing powerset', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof powerset === 'function').toBeTruthy();
  expect(powerset([1, 2])).toEqual([[], [1], [2], [2,1]]);
});