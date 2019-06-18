const {factorial} = require('./_30s.js');

test('factorial is a Function', () => {
  expect(factorial).toBeInstanceOf(Function);
});
test('Calculates the factorial of 720', () => {
  expect(factorial(6)).toBe(720);
});
test('Calculates the factorial of 0', () => {
  expect(factorial(0)).toBe(1);
});
test('Calculates the factorial of 1', () => {
  expect(factorial(1)).toBe(1);
});
test('Calculates the factorial of 4', () => {
  expect(factorial(4)).toBe(24);
});
test('Calculates the factorial of 10', () => {
  expect(factorial(10)).toBe(3628800);
});
test('Throws TypeError if n < 0', () => {
  expect(() => {
    factorial(-1);
  }).toThrow(TypeError);
});
