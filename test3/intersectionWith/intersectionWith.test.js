const expect = require('expect');
const intersectionWith = require('./intersectionWith.js');

test('Testing intersectionWith', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof intersectionWith === 'function').toBeTruthy();
  expect(
    intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b))
  ).toEqual([1.5, 3, 0]);
});
