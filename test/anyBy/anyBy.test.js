const test = require('tape');
const anyBy = require('./anyBy.js');

test('Testing anyBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof anyBy === 'function', 'anyBy is a Function');
  t.true(anyBy([4,1,0,3], x => x >= 1), 'Returns true with predicate function');
  t.false(anyBy([0,1], x => x < 0), 'Returns false with a predicate function');
  //t.deepEqual(anyBy(args..), 'Expected');
  //t.equal(anyBy(args..), 'Expected');
  //t.false(anyBy(args..), 'Expected');
  //t.throws(anyBy(args..), 'Expected');
  t.end();
});
