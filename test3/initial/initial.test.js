const expect = require('expect');
const initial = require('./initial.js');

test('Testing initial', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof initial === 'function').toBeTruthy();
  expect(initial([1, 2, 3])).toEqual([1, 2]);
});