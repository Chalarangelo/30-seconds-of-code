const expect = require('expect');
const fibonacciUntilNum = require('./fibonacciUntilNum.js');

test('Testing fibonacciUntilNum', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof fibonacciUntilNum === 'function').toBeTruthy();
});