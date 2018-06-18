const expect = require('expect');
const takeWhile = require('./takeWhile.js');

test('Testing takeWhile', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof takeWhile === 'function').toBeTruthy();
  expect(takeWhile([1, 2, 3, 4], n => n >= 3)).toEqual([1, 2]);
});
