const test = require('tape');
const all = require('./all.js');

test('Testing all', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof all === 'function', 'all is a Function');
  t.true(all([4,1,2,3]), 'Returns true for arrays with no falsey values');
  t.false(all([0,1]), 'Returns false for arrays with 0');
  t.false(all([NaN,1]), 'Returns false for arrays with NaN');
  t.false(all([undefined,1]), 'Returns false for arrays with undefined');
  t.false(all([null,1]), 'Returns false for arrays with null');
  t.false(all(['',1]), 'Returns false for arrays with empty strings');
  t.true(all([4,1,2,3], x => x >= 1), 'Returns true with predicate function');
  t.false(all([0,1], x => x >= 1), 'Returns false with a predicate function');
  //t.deepEqual(all(args..), 'Expected');
  //t.equal(all(args..), 'Expected');
  //t.false(all(args..), 'Expected');
  //t.throws(all(args..), 'Expected');
  t.end();
});
