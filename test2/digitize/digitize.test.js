const expect = require('expect');
const digitize = require('./digitize.js');

test('Testing digitize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof digitize === 'function').toBeTruthy();
  expect(digitize(123)).toEqual([1, 2, 3]);
});