import expect from 'expect';
let output = '';
const console = {};
console.debug = (x) => output = x;
// Override for testing
const functionName = fn => (console.debug(fn.name), fn);
test('Testing functionName', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof functionName === 'function').toBeTruthy();
  functionName(Math.max);
  expect(output).toBe('max');
  function fun(x) {return x;}
  functionName(fun);
  expect(output).toBe('fun');
  const fn = x => x;
  functionName(fn);
  expect(output).toBe('fn');
});
