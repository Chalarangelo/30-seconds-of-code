const expect = require('expect');
const dropWhile = require('./dropWhile.js');

test('Testing dropWhile', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof dropWhile === 'function').toBeTruthy();
  expect(dropWhile([1, 2, 3, 4], n => n >= 3)).toEqual([3,4]);
});
