const expect = require('expect');
const intersection = require('./intersection.js');

test('Testing intersection', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof intersection === 'function').toBeTruthy();
  expect(intersection([1, 2, 3], [4, 3, 2])).toEqual([2, 3]);
});