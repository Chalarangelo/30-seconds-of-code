const test = require('tape');
const findLastKey = require('./findLastKey.js');

test('Testing findLastKey', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof findLastKey === 'function', 'findLastKey is a Function');
  t.equal(findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
), 'pebbles', 'Returns the appropriate key');
  //t.deepEqual(findLastKey(args..), 'Expected');
  //t.equal(findLastKey(args..), 'Expected');
  //t.false(findLastKey(args..), 'Expected');
  //t.throws(findLastKey(args..), 'Expected');
  t.end();
});
