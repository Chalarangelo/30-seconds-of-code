const expect = require('expect');
const objectToPairs = require('./objectToPairs.js');

test('Testing objectToPairs', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof objectToPairs === 'function').toBeTruthy();
  expect(objectToPairs({ a: 1, b: 2 })).toEqual([['a',1],['b',2]]);
});