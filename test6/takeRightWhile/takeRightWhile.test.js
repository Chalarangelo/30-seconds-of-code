const expect = require('expect');
const takeRightWhile = require('./takeRightWhile.js');

test('Testing takeRightWhile', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof takeRightWhile === 'function').toBeTruthy();
  expect(takeRightWhile([1, 2, 3, 4], n => n < 3)).toEqual([3, 4]);
});
