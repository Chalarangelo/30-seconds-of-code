const test = require('tape');
const collatz = require('./collatz.js');

test('Testing collatz', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof collatz === 'function', 'collatz is a Function');
  //t.deepEqual(collatz(args..), 'Expected');
  //t.equal(collatz(args..), 'Expected');
  //t.false(collatz(args..), 'Expected');
  //t.throws(collatz(args..), 'Expected');
  t.end();
});