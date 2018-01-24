const test = require('tape');
const maxN = require('./maxN.js');

test('Testing maxN', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof maxN === 'function', 'maxN is a Function');
  t.deepEqual(maxN([1, 2, 3]), [3], "Returns the n maximum elements from the provided array");
  t.deepEqual(maxN([1, 2, 3], 2), [3, 2], "Returns the n maximum elements from the provided array");
  //t.deepEqual(maxN(args..), 'Expected');
  //t.equal(maxN(args..), 'Expected');
  //t.false(maxN(args..), 'Expected');
  //t.throws(maxN(args..), 'Expected');
  t.end();
});