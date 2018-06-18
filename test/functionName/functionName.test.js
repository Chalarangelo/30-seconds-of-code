const expect = require('expect');
let output = '';
const console = {};
console.debug = (x) => output = x;
const functionName = fn => (console.debug(fn.name), fn);

test('functionName is a Function', () => {
  expect(functionName).toBeInstanceOf(Function);
});
functionName(Math.max);
test('Works for native functions', () => {
  expect(output).toBe('max');
});
function fun(x) {return x;}
functionName(fun);
test('Works for functions', () => {
  expect(output).toBe('fun');
});
const fn = x => x;
functionName(fn);
test('Works for arrow functions', () => {
  expect(output).toBe('fn');
});
