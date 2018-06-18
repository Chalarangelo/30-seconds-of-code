const expect = require('expect');
const intersectionBy = require('./intersectionBy.js');

test('Testing intersectionBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof intersectionBy === 'function').toBeTruthy();
  expect(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1]);
});
