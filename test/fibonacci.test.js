const expect = require('expect');
const {fibonacci} = require('./_30s.js');

test('fibonacci is a Function', () => {
  expect(fibonacci).toBeInstanceOf(Function);
});
test('Generates an array, containing the Fibonacci sequence', () => {
  expect(fibonacci(6)).toEqual([0, 1, 1, 2, 3, 5]);
});
