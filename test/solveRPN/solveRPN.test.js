const test = require('tape');
const solveRPN = require('./solveRPN.js');

test('Testing solveRPN', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof solveRPN === 'function', 'solveRPN is a Function');
  //t.deepEqual(solveRPN(args..), 'Expected');
  //t.equal(solveRPN(args..), 'Expected');
  //t.false(solveRPN(args..), 'Expected');
  //t.throws(solveRPN(args..), 'Expected');
  t.end();
});