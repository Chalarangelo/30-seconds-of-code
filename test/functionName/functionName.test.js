const expect = require('expect');
let output = '';
const console = {};
console.debug = (x) => output = x;
const functionName = fn => (console.debug(fn.name), fn);

  test('functionName is a Function', () => {
  expect(functionName).toBeInstanceOf(Function);
});
  functionName(Math.max);
  t.equal(output, 'max', 'Works for native functions');
  function fun(x) {return x;}
  functionName(fun);
  t.equal(output, 'fun', 'Works for functions');
  const fn = x => x;
  functionName(fn);
  t.equal(output, 'fn', 'Works for arrow functions');
  

