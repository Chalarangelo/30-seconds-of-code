const test = require('tape');
//const functionName = require('./functionName.js');
// Custom override for console.debug to check output.
let output = '';
const console = {};
console.debug = (x) => output = x;
// Override for testing
const functionName = fn => (console.debug(fn.name), fn);
test('Testing functionName', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof functionName === 'function', 'functionName is a Function');
  functionName(Math.max);
  t.equal(output, 'max', 'Works for native functions');
  function fun(x) {return x;}
  functionName(fun);
  t.equal(output, 'fun', 'Works for functions');
  const fn = x => x;
  functionName(fn);
  t.equal(output, 'fn', 'Works for arrow functions');
  //t.deepEqual(functionName(args..), 'Expected');
  //t.equal(functionName(args..), 'Expected');
  //t.false(functionName(args..), 'Expected');
  //t.throws(functionName(args..), 'Expected');
  t.end();
});
