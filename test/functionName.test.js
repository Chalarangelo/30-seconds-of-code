const expect = require('expect');
const { functionName } = require('./_30s.js');
let output = '';

test('functionName is a Function', () => {
  expect(functionName).toBeInstanceOf(Function);
});
test('Works for native functions', () => {
  expect(typeof functionName(Math.max)).toBe('function');
});
function f(x) {
  return x;
}
test('Works for normal functions', () => {
  expect(typeof functionName(f)).toBe('function');
});
test('Works for arrow functions', () => {
  expect(typeof functionName(x => x)).toBe('function');
});
