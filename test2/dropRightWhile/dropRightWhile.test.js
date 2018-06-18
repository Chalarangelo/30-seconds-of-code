const expect = require('expect');
const dropRightWhile = require('./dropRightWhile.js');

test('Testing dropRightWhile', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof dropRightWhile === 'function').toBeTruthy();
  expect(dropRightWhile([1, 2, 3, 4], n => n < 3)).toEqual([1, 2]);
});
