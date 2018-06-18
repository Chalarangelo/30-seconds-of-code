const expect = require('expect');
const negate = require('./negate.js');

test('Testing negate', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof negate === 'function').toBeTruthy();
  expect([1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0))).toEqual([1, 3, 5]);
});
