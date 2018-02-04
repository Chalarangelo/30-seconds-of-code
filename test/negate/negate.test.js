const test = require('tape');
const negate = require('./negate.js');

test('Testing negate', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof negate === 'function', 'negate is a Function');
  t.deepEqual([1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)), [1, 3, 5], "Negates a predicate function");
  //t.deepEqual(negate(args..), 'Expected');
  //t.equal(negate(args..), 'Expected');
  //t.false(negate(args..), 'Expected');
  //t.throws(negate(args..), 'Expected');
  t.end();
});
