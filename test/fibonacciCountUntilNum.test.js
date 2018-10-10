const expect = require('expect');
const {fibonacciCountUntilNum} = require('./_30s.js');

test('fibonacciCountUntilNum is a Function', () => {
  expect(fibonacciCountUntilNum).toBeInstanceOf(Function);
});
