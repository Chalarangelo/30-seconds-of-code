const test = require('tape');
const noneBy = require('./noneBy.js');

test('Testing noneBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof noneBy === 'function', 'noneBy is a Function');
  t.true(noneBy([4,1,0,3], x => x < 0), 'Returns true with a predicate function');
  t.false(noneBy([0,1,2], x => x == 1), 'Returns false with predicate function');
  //t.deepEqual(noneBy(args..), 'Expected');
  //t.equal(noneBy(args..), 'Expected');
  //t.false(noneBy(args..), 'Expected');
  //t.throws(noneBy(args..), 'Expected');
  t.end();
});
