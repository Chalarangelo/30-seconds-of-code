const expect = require('expect');
const {fibonacciCountUntilNum} = require('./_30s.js');

test('fibonacciCountUntilNum is a Function', () => {
  expect(fibonacciCountUntilNum).toBeInstanceOf(Function);
});
test('Returns the correct number', () => {
  expect(fibonacciCountUntilNum(10)).toBe(7);
});
