const test = require('tape');
const allBy = require('./allBy.js');

test('Testing allBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof allBy === 'function', 'allBy is a Function');
  t.true(allBy([4,1,2,3], x => x >= 1), 'Returns true with predicate function');
  t.false(allBy([0,1], x => x >= 1), 'Returns false with a predicate function');
  //t.deepEqual(allBy(args..), 'Expected');
  //t.equal(allBy(args..), 'Expected');
  //t.false(allBy(args..), 'Expected');
  //t.throws(allBy(args..), 'Expected');
  t.end();
});
