const expect = require('expect');
const {pipeFunctions} = require('./_30s.js');

test('pipeFunctions is a Function', () => {
  expect(pipeFunctions).toBeInstanceOf(Function);
});
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
test('Performs left-to-right function composition', () => {
  expect(multiplyAndAdd5(5, 2)).toBe(15);
});
