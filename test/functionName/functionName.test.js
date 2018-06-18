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
  expect(output, 'max').toBe()
});
  function fun(x) {return x;}
  functionName(fun);
  test('Works for functions', () => {
  expect(output, 'fun').toBe()
});
  const fn = x => x;
  functionName(fn);
  test('Works for arrow functions', () => {
  expect(output, 'fn').toBe()
});
  

