const {spreadOver} = require('./_30s.js');

test('spreadOver is a Function', () => {
  expect(spreadOver).toBeInstanceOf(Function);
});
const arrayMax = spreadOver(Math.max);
test('Takes a variadic function and returns a closure that accepts an array of arguments to map to the inputs of the function.', () => {
  expect(arrayMax([1, 2, 3])).toBe(3);
});
