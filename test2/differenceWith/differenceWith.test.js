const expect = require('expect');
const differenceWith = require('./differenceWith.js');

test('Testing differenceWith', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof differenceWith === 'function').toBeTruthy();
  expect(
    differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b))
  ).toEqual([1, 1.2]);
});