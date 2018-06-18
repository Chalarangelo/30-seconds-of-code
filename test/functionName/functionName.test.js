const expect = require('expect');
let output = '';
const functionName = fn => fn.name;

test('functionName is a Function', () => {
  expect(functionName).toBeInstanceOf(Function);
});
test('Works for native functions', () => {
  expect(functionName(Math.max)).toBe('max');
});
function fun(x) {return x;}
test('Works for functions', () => {
  expect(functionName(fun)).toBe('fun');
});
const fn = x => x;
test('Works for arrow functions', () => {
  expect(functionName(fn)).toBe('fn');
});
