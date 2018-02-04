const test = require('tape');
const pipeFunctions = require('./pipeFunctions.js');

test('Testing pipeFunctions', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pipeFunctions === 'function', 'pipeFunctions is a Function');
  const add5 = x => x + 5;
  const multiply = (x, y) => x * y;
  const multiplyAndAdd5 = pipeFunctions(multiply, add5);
  t.equal(multiplyAndAdd5(5, 2), 15, 'Performs left-to-right function composition');
  //t.deepEqual(pipeFunctions(args..), 'Expected');
  //t.equal(pipeFunctions(args..), 'Expected');
  //t.false(pipeFunctions(args..), 'Expected');
  //t.throws(pipeFunctions(args..), 'Expected');
  t.end();
});
