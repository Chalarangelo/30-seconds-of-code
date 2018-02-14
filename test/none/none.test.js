const test = require('tape');
const none = require('./none.js');

test('Testing none', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof none === 'function', 'none is a Function');
  t.true(none([0,undefined,NaN,null,'']), 'Returns true for arrays with no truthy values');
  t.false(none([0,1]), 'Returns false for arrays with at least one truthy value');
  //t.deepEqual(none(args..), 'Expected');
  //t.equal(none(args..), 'Expected');
  //t.false(none(args..), 'Expected');
  //t.throws(none(args..), 'Expected');
  t.end();
});
