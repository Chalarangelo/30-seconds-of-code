const expect = require('expect');
const unary = require('./unary.js');

test('Testing unary', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof unary === 'function').toBeTruthy();
  expect(['6', '8', '10'].map(unary(parseInt))).toEqual([6, 8, 10]);
});
