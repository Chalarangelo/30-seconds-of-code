const test = require('tape');
const any = require('./any.js');

test('Testing any', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof any === 'function', 'any is a Function');
  t.true(any([0,1,2,3]), 'Returns true for arrays with at least one truthy value');
  t.false(any([0,0]), 'Returns false for arrays with no truthy values');
  t.false(any([NaN,0,undefined,null,'']), 'Returns false for arrays with no truthy values');
  t.true(any([4,1,0,3], x => x >= 1), 'Returns true with predicate function');
  t.false(any([0,1], x => x < 0), 'Returns false with a predicate function');
  //t.deepEqual(any(args..), 'Expected');
  //t.equal(any(args..), 'Expected');
  //t.false(any(args..), 'Expected');
  //t.throws(any(args..), 'Expected');
  t.end();
});
