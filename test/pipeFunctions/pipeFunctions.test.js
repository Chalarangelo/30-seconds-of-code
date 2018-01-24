const test = require('tape');
const pipeFunctions = require('./pipeFunctions.js');

test('Testing pipeFunctions', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pipeFunctions === 'function', 'pipeFunctions is a Function');
  //t.deepEqual(pipeFunctions(args..), 'Expected');
  //t.equal(pipeFunctions(args..), 'Expected');
  //t.false(pipeFunctions(args..), 'Expected');
  //t.throws(pipeFunctions(args..), 'Expected');
  t.end();
});