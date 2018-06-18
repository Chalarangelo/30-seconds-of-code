const expect = require('expect');
const solveRPN = require('./solveRPN.js');

test('Testing solveRPN', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof solveRPN === 'function').toBeTruthy();
});