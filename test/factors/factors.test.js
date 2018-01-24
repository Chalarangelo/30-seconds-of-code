const test = require('tape');
const factors = require('./factors.js');

test('Testing factors', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof factors === 'function', 'factors is a Function');
  //t.deepEqual(factors(args..), 'Expected');
  //t.equal(factors(args..), 'Expected');
  //t.false(factors(args..), 'Expected');
  //t.throws(factors(args..), 'Expected');
  t.end();
});