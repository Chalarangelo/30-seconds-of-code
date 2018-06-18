const expect = require('expect');
const objectFromPairs = require('./objectFromPairs.js');

test('Testing objectFromPairs', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof objectFromPairs === 'function').toBeTruthy();
  expect(objectFromPairs([['a', 1], ['b', 2]])).toEqual({a: 1, b: 2});
});