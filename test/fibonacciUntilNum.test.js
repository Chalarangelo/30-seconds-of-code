const {fibonacciUntilNum} = require('./_30s.js');

test('fibonacciUntilNum is a Function', () => {
  expect(fibonacciUntilNum).toBeInstanceOf(Function);
});
test('Returns the correct sequence', () => {
  expect(fibonacciUntilNum(10)).toEqual([0, 1, 1, 2, 3, 5, 8]);
});
