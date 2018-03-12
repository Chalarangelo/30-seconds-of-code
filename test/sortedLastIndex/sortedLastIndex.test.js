const test = require('tape');
const sortedLastIndex = require('./sortedLastIndex.js');

test('Testing sortedLastIndex', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sortedLastIndex === 'function', 'sortedLastIndex is a Function');
  t.equal(sortedLastIndex([10, 20, 30, 30, 40], 30), 4, 'Returns the highest index to insert the element without messing up the list order');
  //t.deepEqual(sortedLastIndex(args..), 'Expected');
  //t.equal(sortedLastIndex(args..), 'Expected');
  //t.false(sortedLastIndex(args..), 'Expected');
  //t.throws(sortedLastIndex(args..), 'Expected');
  t.end();
});
