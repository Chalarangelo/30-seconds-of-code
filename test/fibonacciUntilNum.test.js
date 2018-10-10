const expect = require('expect');
const {fibonacciUntilNum} = require('./_30s.js');

test('fibonacciUntilNum is a Function', () => {
  expect(fibonacciUntilNum).toBeInstanceOf(Function);
});
