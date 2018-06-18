const expect = require('expect');
const fibonacciCountUntilNum = require('./fibonacciCountUntilNum.js');

test('Testing fibonacciCountUntilNum', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof fibonacciCountUntilNum === 'function').toBeTruthy();
});